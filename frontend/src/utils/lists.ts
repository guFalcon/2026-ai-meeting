import { singleton as dateUtils } from '@/utils/dateUtils'
import chroma from 'chroma-js'

export class Lists {
  public static readonly LODS = {
    lod1: {
      table: 'opcua.values',
      stride: 10 * 1000
    },
    lod2: {
      table: 'opcua.valuesLod2',
      stride: 15 * 60 * 1000
    },
    lod3: {
      table: 'opcua.valuesLod3',
      stride: 24 * 60 * 60 * 1000
    }
  }

  public static readonly TIMEUNIT_NAME = {
    years5: 'years5',
    years2: 'years2',
    lastYear: 'lastYear',
    thisYear: 'thisYear',
    year: 'year',
    months6: 'months6',
    months3: 'months3',
    months2: 'months2',
    lastMonth: 'lastMonth',
    thisMonth: 'thisMonth',
    month: 'month',
    weeks2: 'weeks2',
    lastWeek: 'lastWeek',
    thisWeek: 'thisWeek',
    week: 'week',
    days2: 'days2',
    yesterday: 'yesterday',
    today: 'today',
    day: 'day',
    hours2: 'hours2',
    hour: 'hour',
    minute: 'minute',
    second: 'second'
  }

  private static readonly GRAPH_MAIN_COLORS = [
    '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395',
    '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac',
    '#b77322', '#16d620', '#b91383', '#f4359e', '#9c5935', '#a9c413', '#2a778d', '#668d1c', '#bea413', '#0c5922', '#743411'
  ]

  public static readonly GRAPH_COLORS = Lists.GRAPH_MAIN_COLORS.map(main => {
    return {
      main,
      light: chroma(main).brighten(1.5).hex(),
      dark: chroma(main).darken(1.5).hex()
    }
  })

  public static getFirstXColors (x: number, mode: 'main' | 'light' | 'dark' = 'main'): string[] {
    const colors: string[] = []
    for (let i = 0; i < x; i++) {
      colors.push(this.GRAPH_COLORS[i % this.GRAPH_COLORS.length][mode])
    }
    return colors
  }

  public static readonly WINDOW_SIZES = {
    tenMinutes: { name: '10 minutes', value: 10 * 60 * 1000, translationKey: 'tenMinutes' },
    fifteenMinutes: { name: '15 minutes', value: 15 * 60 * 1000, translationKey: 'fifteenMinutes' },
    thirtyMinutes: { name: '30 minutes', value: 30 * 60 * 1000, translationKey: 'thirtyMinutes' },
    oneHour: { name: '1 hour', value: 60 * 60 * 1000, translationKey: 'oneHour' },
    twoHours: { name: '2 hours', value: 2 * 60 * 60 * 1000, translationKey: 'twoHours' },
    sixHours: { name: '6 hours', value: 6 * 60 * 60 * 1000, translationKey: 'sixHours' },
    twelveHours: { name: '12 hours', value: 12 * 60 * 60 * 1000, translationKey: 'twelveHours' },
    oneDay: { name: '1 day', value: 24 * 60 * 60 * 1000, translationKey: 'oneDay' },
    twoDays: { name: '2 days', value: 2 * 24 * 60 * 60 * 1000, translationKey: 'twoDays' },
    fourDays: { name: '4 days', value: 4 * 24 * 60 * 60 * 1000, translationKey: 'fourDays' },
    oneWeek: { name: '1 week', value: 7 * 24 * 60 * 60 * 1000, translationKey: 'oneWeek' },
    oneMonth: { name: '1 month', value: 30 * 24 * 60 * 60 * 1000, translationKey: 'oneMonth' },
    twoMonths: { name: '2 months', value: 60 * 24 * 60 * 60 * 1000, translationKey: 'twoMonths' },
    oneYear: { name: '1 year', value: 365 * 24 * 60 * 60 * 1000, translationKey: 'oneYear' }
  }

  public static readonly WINDOW_DISTANCES = {
    before: {
      name: 'before',
      calculateDate: (fromDate, durationInMillis) => {
        return new Date(fromDate.getTime() - durationInMillis)
      },
      translationKey: 'before'
    },
    oneDay: {
      name: 'oneDay',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate() - 1,
          0,
          0,
          0
        )
      },
      translationKey: 'oneDay'
    },
    twoDays: {
      name: '2 days',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate() - 2,
          0,
          0,
          0
        )
      },
      translationKey: 'twoDays'
    },
    oneWeek: {
      name: '1 week',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate() - 7,
          0,
          0,
          0
        )
      },
      translationKey: 'oneWeek'
    },
    twoWeeks: {
      name: '2 weeks',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate() - 14,
          0,
          0,
          0
        )
      },
      translationKey: 'twoWeeks'
    },
    oneMonth: {
      name: '1 month',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth() - 1,
          fromDate.getDate(),
          0,
          0,
          0
        )
      },
      translationKey: 'oneMonth'
    },
    twoMonths: {
      name: '2 months',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear(),
          fromDate.getMonth() - 2,
          fromDate.getDate(),
          0,
          0,
          0
        )
      },
      translationKey: 'twoMonths'
    },
    oneYear: {
      name: '1 year',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear() - 1,
          fromDate.getMonth(),
          fromDate.getDate(),
          0,
          0,
          0
        )
      },
      translationKey: 'oneYear'
    },
    twoYears: {
      name: '2 years',
      calculateDate: (fromDate) => {
        return new Date(
          fromDate.getFullYear() - 2,
          fromDate.getMonth(),
          fromDate.getDate(),
          0,
          0,
          0
        )
      },
      translationKey: 'twoYears'
    }
  }

  public static getSuggestedIntervals (selectedIntervalSizeInMillis, selectedIntervalStartDate) {
    const oneDayInMillis = 24 * 60 * 60 * 1000
    let suggestions

    if (selectedIntervalSizeInMillis <= oneDayInMillis) {
      suggestions = [
        { label: 'Just before', start: selectedIntervalStartDate - selectedIntervalSizeInMillis },
        { label: 'Yesterday', start: selectedIntervalStartDate - oneDayInMillis },
        { label: 'Last week', start: selectedIntervalStartDate - 7 * oneDayInMillis },
        { label: 'Last month', start: selectedIntervalStartDate - 30 * oneDayInMillis },
        { label: 'Last year', start: selectedIntervalStartDate - 365 * oneDayInMillis }
      ]
    } else {
    // Replace this with the suggestions for intervals longer than one day
      suggestions = [
      // ...
      ]
    }

    return suggestions.map(suggestion => ({
      ...suggestion,
      start: new Date(suggestion.start)
    }))
  }

  public static readonly TIMEUNITS = {
    getDropdownItem: function (timeUnit, t) {
      return {
        name: t.$i18n.t(timeUnit.headingTranslationKey),
        value: timeUnit.name
      }
    },
    years5: {
      name: Lists.TIMEUNIT_NAME.years5,
      unitTranslationKey: 'units.year',
      headingTranslationKey: 'page.reports.year5',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear() - 5,
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_YEAR',
      trendPlus: 90 * 24 * 60 * 60 * 1000
    },
    years2: {
      name: Lists.TIMEUNIT_NAME.years2,
      unitTranslationKey: 'units.year',
      headingTranslationKey: 'page.reports.year2',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear() - 2,
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_6_MONTHS',
      trendPlus: 60 * 24 * 60 * 60 * 1000
    },
    lastYear: {
      name: Lists.TIMEUNIT_NAME.lastYear,
      unitTranslationKey: 'units.year',
      headingTranslationKey: 'page.reports.lastYear',
      from: () => {
        const now = new Date()
        return new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0)
      },
      to: () => {
        const now = new Date()
        return new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59)
      },
      histogramBucketType: 'SAME_6_MONTHS',
      trendPlus: 30 * 24 * 60 * 60 * 1000
    },
    thisYear: {
      name: Lists.TIMEUNIT_NAME.thisYear,
      unitTranslationKey: 'units.year',
      headingTranslationKey: 'page.reports.thisYear',
      from: () => {
        const now = new Date()
        return new Date(now.getFullYear(), 0, 1, 0, 0, 0)
      },
      to: () => {
        const now = new Date()
        return new Date(now.getFullYear(), 11, 31, 23, 59, 59)
      },
      histogramBucketType: 'SAME_6_MONTHS',
      trendPlus: 30 * 24 * 60 * 60 * 1000
    },
    year: {
      name: Lists.TIMEUNIT_NAME.year,
      unitTranslationKey: 'units.year',
      headingTranslationKey: 'page.reports.year',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_6_MONTHS',
      trendPlus: 30 * 24 * 60 * 60 * 1000
    },
    months6: {
      name: Lists.TIMEUNIT_NAME.months6,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.month6',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth() - 6,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_MONTH',
      trendPlus: 30 * 24 * 60 * 60 * 1000
    },
    months3: {
      name: Lists.TIMEUNIT_NAME.months3,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.month3',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_MONTH',
      trendPlus: 14 * 24 * 60 * 60 * 1000
    },
    months2: {
      name: Lists.TIMEUNIT_NAME.months2,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.month2',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth() - 2,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_WEEK',
      trendPlus: 10 * 24 * 60 * 60 * 1000
    },
    lastMonth: {
      name: Lists.TIMEUNIT_NAME.lastMonth,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.lastMonth',
      from: () => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0)
      },
      to: () => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
      },
      histogramBucketType: 'SAME_WEEK',
      trendPlus: 5 * 24 * 60 * 60 * 1000
    },
    thisMonth: {
      name: Lists.TIMEUNIT_NAME.thisMonth,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.thisMonth',
      from: () => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
      },
      to: () => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      },
      histogramBucketType: 'SAME_WEEK',
      trendPlus: 5 * 24 * 60 * 60 * 1000
    },
    month: {
      name: Lists.TIMEUNIT_NAME.month,
      unitTranslationKey: 'units.month',
      headingTranslationKey: 'page.reports.month',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_WEEK',
      trendPlus: 5 * 24 * 60 * 60 * 1000
    },
    weeks2: {
      name: Lists.TIMEUNIT_NAME.weeks2,
      unitTranslationKey: 'units.week',
      headingTranslationKey: 'page.reports.week2',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_DAY',
      trendPlus: 2 * 24 * 60 * 60 * 1000
    },
    lastWeek: {
      name: Lists.TIMEUNIT_NAME.lastWeek,
      unitTranslationKey: 'units.week',
      headingTranslationKey: 'page.reports.lastWeek',
      from: () => {
        const now = new Date()
        return dateUtils.getPreviousMondayFor(now)
      },
      to: () => {
        const now = new Date()
        const lastMonday = dateUtils.getLastMondayFor(now)
        return new Date(
          lastMonday.getFullYear(),
          lastMonday.getMonth(),
          lastMonday.getDate() - 1,
          23,
          59,
          59
        )
      },
      histogramBucketType: 'SAME_DAY',
      trendPlus: 24 * 60 * 60 * 1000
    },
    thisWeek: {
      name: Lists.TIMEUNIT_NAME.thisWeek,
      unitTranslationKey: 'units.week',
      headingTranslationKey: 'page.reports.thisWeek',
      from: () => {
        const now = new Date()
        return dateUtils.getLastMondayFor(now)
      },
      to: () => {
        const now = new Date()
        const lastMonday = dateUtils.getLastMondayFor(now)
        return new Date(
          lastMonday.getFullYear(),
          lastMonday.getMonth(),
          lastMonday.getDate() + 6,
          23,
          59,
          59
        )
      },
      histogramBucketType: 'SAME_DAY',
      trendPlus: 24 * 60 * 60 * 1000
    },
    week: {
      name: Lists.TIMEUNIT_NAME.week,
      unitTranslationKey: 'units.week',
      headingTranslationKey: 'page.reports.week',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 7 * 24 * 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_DAY',
      trendPlus: 24 * 60 * 60 * 1000
    },
    days2: {
      name: Lists.TIMEUNIT_NAME.days2,
      unitTranslationKey: 'units.day',
      headingTranslationKey: 'page.reports.day2',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 2 * 24 * 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_DAY',
      trendPlus: 12 * 60 * 60 * 1000
    },
    yesterday: {
      name: Lists.TIMEUNIT_NAME.yesterday,
      unitTranslationKey: 'units.day',
      headingTranslationKey: 'page.reports.yesterday',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          0,
          0,
          0
        )
      },
      to: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          23,
          59,
          59
        )
      },
      histogramBucketType: 'SAME_12_HOURS',
      trendPlus: 8 * 60 * 60 * 1000
    },
    today: {
      name: Lists.TIMEUNIT_NAME.today,
      unitTranslationKey: 'units.day',
      headingTranslationKey: 'page.reports.today',
      from: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0
        )
      },
      to: () => {
        const now = new Date()
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        )
      },
      histogramBucketType: 'SAME_12_HOURS',
      trendPlus: 8 * 60 * 60 * 1000
    },
    day: {
      name: Lists.TIMEUNIT_NAME.day,
      unitTranslationKey: 'units.day',
      headingTranslationKey: 'page.reports.day',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 24 * 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_12_HOURS',
      trendPlus: 8 * 60 * 60 * 1000
    },
    hours2: {
      name: Lists.TIMEUNIT_NAME.hours2,
      unitTranslationKey: 'units.hour',
      headingTranslationKey: 'page.reports.hour2',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 2 * 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_30_MINUTES',
      trendPlus: 30 * 60 * 1000
    },
    hour: {
      name: Lists.TIMEUNIT_NAME.hour,
      unitTranslationKey: 'units.hour',
      headingTranslationKey: 'page.reports.hour',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 60 * 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_15_MINUTES',
      trendPlus: 15 * 60 * 1000
    },
    minute: {
      name: Lists.TIMEUNIT_NAME.minute,
      unitTranslationKey: 'units.minute',
      headingTranslationKey: 'page.reports.minute',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 60 * 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_10_SECONDS',
      trendPlus: 10 * 1000
    },
    second: {
      name: Lists.TIMEUNIT_NAME.second,
      unitTranslationKey: 'units.second',
      headingTranslationKey: 'page.reports.second',
      from: () => {
        const nd = new Date()
        nd.setTime(nd.getTime() - 1000)
        return nd
      },
      to: () => new Date(),
      histogramBucketType: 'SAME_SECOND',
      trendPlus: 250
    }
  }

  public static getBestFitFor (from, to) {
    const duration = to - from
    if (duration > 1000 * 60 * 60 * 24 * 365 * 2) {
      // two years
      return 'SAME_YEAR'
    }
    if (duration > 1000 * 60 * 60 * 24 * 365) {
      // a year
      return 'SAME_6_MONTHS'
    }
    if (duration > 1000 * 60 * 60 * 24 * 30 * 3) {
      // three months
      return 'SAME_MONTH'
    }
    if (duration > 1000 * 60 * 60 * 24 * 21) {
      // three weeks
      return 'SAME_WEEK'
    }
    if (duration > 1000 * 60 * 60 * 24 * 4) {
      // 4 days
      return 'SAME_DAY'
    }
    if (duration > 1000 * 60 * 60 * 2) {
      // two hours
      return 'SAME_12_HOURS'
    }
    if (duration > 1000 * 60 * 60) {
      // an hour
      return 'SAME_30_MINUTES'
    }
    if (duration > 1000 * 60 * 15) {
      // 30 minutes
      return 'SAME_15_MINUTES'
    }
    if (duration > 1000 * 60) {
      // 10 seconds
      return 'SAME_10_SECONDS'
    }
    return 'SAME_SECOND'
  }

  public static getBestTrendPlusFor (from, to) {
    const duration = to - from
    return duration / 5.0
  }

  public static readonly UNITS = [
    { name: 'subscription.unit.NONE', value: 'NONE' },

    { name: 'subscription.unit.DEGREE_CELSIUS', value: 'DEGREE_CELSIUS' },
    { name: 'subscription.unit.DEGREE_FAHRENHEIT', value: 'DEGREE_FAHRENHEIT' },
    { name: 'subscription.unit.KELVIN', value: 'KELVIN' },
    { name: 'subscription.unit.REL_HUM', value: 'REL_HUM' },
    { name: 'subscription.unit.ABS_HUM', value: 'ABS_HUM' },
    { name: 'subscription.unit.PERCENT', value: 'PERCENT' },
    { name: 'subscription.unit.VOLT', value: 'VOLT' },
    { name: 'subscription.unit.AMPERE', value: 'AMPERE' },
    { name: 'subscription.unit.WATT', value: 'WATT' },
    { name: 'subscription.unit.WATT_HOURS', value: 'WATT_HOURS' },
    { name: 'subscription.unit.CUBIC_METERS', value: 'CUBIC_METERS' },
    { name: 'subscription.unit.METERS_PER_SEC', value: 'METERS_PER_SEC' },
    { name: 'subscription.unit.METERS_PER_H', value: 'METERS_PER_H' },
    { name: 'subscription.unit.METER', value: 'METER' },
    { name: 'subscription.unit.DEGREE', value: 'DEGREE' },
    { name: 'subscription.unit.LITERS', value: 'LITERS' },
    { name: 'subscription.unit.PASCAL', value: 'PASCAL' },
    { name: 'subscription.unit.PSI', value: 'PSI' },
    { name: 'subscription.unit.LUX', value: 'LUX' },
    { name: 'subscription.unit.EURO', value: 'EURO' },
    { name: 'subscription.unit.GRAM', value: 'GRAM' },

    { name: 'subscription.unit.ON_OFF', value: 'ON_OFF' },
    { name: 'subscription.unit.OPENED_CLOSED', value: 'OPENED_CLOSED' },
    { name: 'subscription.unit.TRUE_FALSE', value: 'TRUE_FALSE' },
    { name: 'subscription.unit.FAILURE_OK', value: 'FAILURE_OK' },
    { name: 'subscription.unit.TILTED_NORMAL', value: 'TILTED_NORMAL' },
    { name: 'subscription.unit.OVERLOAD_NORMAL', value: 'OVERLOAD_NORMAL' },
    { name: 'subscription.unit.OVERTEMP_NORMAL', value: 'OVERTEMP_NORMAL' },
    { name: 'subscription.unit.MOTION_IDLE', value: 'MOTION_IDLE' },
    { name: 'subscription.unit.EXTERNAL_BATTERY', value: 'EXTERNAL_BATTERY' }
  ]

  public static readonly UNIT_PREFIXES = [
    { name: 'subscription.unitPrefix.ATTO', value: 'ATTO' },
    { name: 'subscription.unitPrefix.FEMTO', value: 'FEMTO' },
    { name: 'subscription.unitPrefix.PICO', value: 'PICO' },
    { name: 'subscription.unitPrefix.NANO', value: 'NANO' },
    { name: 'subscription.unitPrefix.MICRO', value: 'MICRO' },
    { name: 'subscription.unitPrefix.MILLI', value: 'MILLI' },

    { name: 'subscription.unitPrefix.NONE', value: 'NONE' },

    { name: 'subscription.unitPrefix.KILO', value: 'KILO' },
    { name: 'subscription.unitPrefix.MEGA', value: 'MEGA' },
    { name: 'subscription.unitPrefix.GIGA', value: 'GIGA' },
    { name: 'subscription.unitPrefix.TERA', value: 'TERA' },
    { name: 'subscription.unitPrefix.PETA', value: 'PETA' },
    { name: 'subscription.unitPrefix.EXA', value: 'EXA' }
  ]

  public static getUnitShiftToBase (unit) {
    const none = Lists.UNIT_PREFIXES.findIndex((p) => p.value === 'NONE')
    if (none === -1) {
      console.error(
        "Parsing error when parsing units. 'NONE' is not present in UNIT_PREFIXES array."
      )
      return 0
    }

    const index = Lists.UNIT_PREFIXES.findIndex((p) => p.value === unit)
    if (index === -1) {
      return 0
    }

    return index === none ? 0 : (index - none) * 3
  }

  public static applyUnitShift (shift, value) {
    return value * Math.pow(10, shift)
  }

  public static getAndApplyUnitShift (unit, value) {
    const shift = Lists.getUnitShiftToBase(unit)
    return Lists.applyUnitShift(shift, value)
  }

  public static readonly PAGES_TAB_NAMES = ['infos', 'overview', 'switches', 'lights', 'electricity', 'heating', 'water', 'it', 'shutters', 'doors', 'temperatures', 'humidity', 'movement']
  public static readonly PAGES_TAB_ICONS = ['info_outline', 'speed', 'toggle_on', 'lightbulb_outline', 'electrical_services', 'local_fire_department', 'water', 'storage', 'blinds', 'meeting_room', 'thermostat', 'water_drop', 'track_changes']

  public static readonly SUBSCRIPTION_TYPES = [
    { name: 'subscription.type.OPCUA', value: 'OPCUA' },
    { name: 'subscription.type.MQTT', value: 'MQTT' },
    { name: 'subscription.type.SIMULATED', value: 'SIMULATED' },
    { name: 'subscription.type.CALCULATED', value: 'CALCULATED' }
  ]

  public static readonly SUBSCRIPTION_VALUE_TYPES = [
    { name: 'subscription.valueType.FLOAT', value: 'float' },
    { name: 'subscription.valueType.SHORT', value: 'short' },
    { name: 'subscription.valueType.INT', value: 'int' },
    { name: 'subscription.valueType.DOUBLE', value: 'double' },
    { name: 'subscription.valueType.LONG', value: 'long' },
    { name: 'subscription.valueType.BOOLEAN', value: 'boolean' }
  ]
}

let instanceField: Lists

export const instance = () => {
  if (!instance) {
    instanceField || (instanceField = new Lists())
  }
  return instance
}
