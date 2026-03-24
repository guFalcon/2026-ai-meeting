export interface UnitLabel {
  singular: string;
  plural: string;
}

export interface VerbosityLevel {
  day: UnitLabel;
  hour: UnitLabel;
  millisecond: UnitLabel;
  minute: UnitLabel;
  month: UnitLabel;
  second: UnitLabel;
  week: UnitLabel;
  year: UnitLabel;
}

export interface DurationLocaleConfig {
  long: VerbosityLevel;
  short: VerbosityLevel;
  veryShort: VerbosityLevel;
}

type Parts = {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

export class DurationFormatter {
  private static instanceField: DurationFormatter

  public static getInstance (): DurationFormatter {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new DurationFormatter())
    }
    return this.instanceField
  }

  public static readonly TimeUnit = {
    YEAR: 'year',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    HOUR: 'hour',
    MINUTE: 'minute',
    SECOND: 'second',
    MILLISECOND: 'millisecond'
  } as const

  public static readonly Verbosity = {
    LONG: 'long',
    SHORT: 'short',
    VERY_SHORT: 'veryShort'
  } as const

  private static readonly ORDER: TimeUnit[] = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond'
  ]

  private config?: DurationLocaleConfig
  private ready = false

  public initialize (config: DurationLocaleConfig) {
    this.config = config
    this.ready = true
    return this
  }

  private labelFor (value: number, unit: TimeUnit, verbosity: Verbosity) {
    if (!this.ready || !this.config) {
      throw new Error('DurationFormatter not initialized')
    }
    const lvl = this.config[verbosity]
    const lab = lvl[unit]
    return value === 1 ? lab.singular : lab.plural
  }

  private joinParts (chunks: string[], verbosity: Verbosity) {
    if (chunks.length === 0) return ''
    if (chunks.length === 1) return chunks[0]
    if (verbosity === DurationFormatter.Verbosity.LONG) {
      // Oxford-Style: "a b c and d"
      return `${chunks.slice(0, -1).join(' ')} and ${chunks[chunks.length - 1]}`
    }
    // Shortforms: space only
    return chunks.join(' ')
  }

  private token (value: number, unit: TimeUnit, verbosity: Verbosity, withSpace: boolean) {
    const label = this.labelFor(value, unit, verbosity)
    return withSpace ? `${value} ${label}` : `${value}${label}`
  }

  public formatTillNow (
    timeInMilliseconds: number,
    verbosity: Verbosity,
    lowCutoffTimeUnit: TimeUnit,
    maxDisplayTop?: number
  ): string {
    const now = new Date()
    const s = now.getTime() - timeInMilliseconds
    return this.format(timeInMilliseconds, new Date(s), verbosity, lowCutoffTimeUnit, maxDisplayTop)
  }

  public format (
    timeInMilliseconds: number,
    startDate: Date,
    verbosity: Verbosity,
    lowCutoffTimeUnit: TimeUnit,
    maxDisplayTop?: number
  ): string {
    if (!this.ready || !this.config) {
      throw new Error('DurationFormatter not initialized')
    }

    // 0-case: "0 <unit>"
    if (timeInMilliseconds === 0 || isNaN(timeInMilliseconds)) {
      return this.token(0, lowCutoffTimeUnit, verbosity, true)
    }

    const wantWeeks =
      lowCutoffTimeUnit === DurationFormatter.TimeUnit.WEEK

    // Split calendar-accurate (UTC)
    const parts = this.decomposeCalendar(timeInMilliseconds, startDate)

    // convert days to weeks, if weeks are allowed in the output
    if (wantWeeks && parts.day >= 7) {
      parts.week = Math.floor(parts.day / 7)
      parts.day = parts.day % 7
    }

    // only units >= lowCutoff with value > 0
    const cutoffIdx = DurationFormatter.ORDER.indexOf(lowCutoffTimeUnit)
    const unitsForOutput = DurationFormatter.ORDER
      .slice(0, cutoffIdx + 1)
      .filter(u => parts[u] > 0)

    if (unitsForOutput.length === 0) {
      return this.token(0, lowCutoffTimeUnit, verbosity, true)
    }

    const limitedUnits =
      typeof maxDisplayTop === 'number' && maxDisplayTop > 0
        ? unitsForOutput.slice(0, maxDisplayTop)
        : unitsForOutput

    const withSpaceInsideToken =
      verbosity === DurationFormatter.Verbosity.LONG || limitedUnits.length === 1

    const chunks = limitedUnits.map(
      u => this.token(parts[u], u, verbosity, withSpaceInsideToken)
    )

    return this.joinParts(chunks, verbosity)
  }

  // --- Calendar-accurate decomposition (UTC) ---
  private decomposeCalendar (ms: number, start: Date): {
  year: number; month: number; week: number; day: number;
  hour: number; minute: number; second: number; millisecond: number;
} {
    const MS_DAY = 86_400_000

    const end = new Date(start.getTime() + ms)
    let cursor = new Date(start.getTime())

    const year = this.wholeYearsBetween(cursor, end)
    cursor = this.addUTC(cursor, { years: year })

    const month = this.wholeMonthsBetween(cursor, end)
    cursor = this.addUTC(cursor, { months: month })

    // WICHTIG: Tage aus verbleibender Zeitspanne, nicht aus Mitternachts-Differenzen
    let rest = end.getTime() - cursor.getTime()

    const day = Math.floor(rest / MS_DAY); rest -= day * MS_DAY
    const hour = Math.floor(rest / 3_600_000); rest -= hour * 3_600_000
    const minute = Math.floor(rest / 60_000); rest -= minute * 60_000
    const second = Math.floor(rest / 1_000); rest -= second * 1_000
    const millisecond = rest

    return { year, month, week: 0, day, hour, minute, second, millisecond }
  }

  private wholeYearsBetween (from: Date, to: Date) {
    let y = 0
    while (true) {
      const next = this.addUTC(from, { years: y + 1 })
      if (next <= to) y++
      else break
    }
    return y
  }

  private wholeMonthsBetween (from: Date, to: Date) {
    let m = 0
    while (true) {
      const next = this.addUTC(from, { months: m + 1 })
      if (next <= to) m++
      else break
    }
    return m
  }

  private wholeDaysBetween (from: Date, to: Date) {
    const f = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate())
    const t = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate())
    return Math.floor((t - f) / 86_400_000)
  }

  private addUTC (
    date: Date,
    delta: { years?: number; months?: number; days?: number }
  ) {
    const years = delta.years ?? 0
    const months = delta.months ?? 0
    const days = delta.days ?? 0

    const d = new Date(date.getTime())
    if (years) d.setUTCFullYear(d.getUTCFullYear() + years)
    if (months) d.setUTCMonth(d.getUTCMonth() + months)
    if (days) d.setUTCDate(d.getUTCDate() + days)
    return d
  }
}

type TimeUnit =
  typeof DurationFormatter.TimeUnit[keyof typeof DurationFormatter.TimeUnit]

type Verbosity =
  typeof DurationFormatter.Verbosity[keyof typeof DurationFormatter.Verbosity]

export const instance = DurationFormatter.getInstance()
