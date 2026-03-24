import { DurationFormatter, instance as durationFormatter } from '../../src/utils/durationFormatter'

const config = {
  long: {
    day: { singular: 'day', plural: 'days' },
    hour: { singular: 'hour', plural: 'hours' },
    millisecond: { singular: 'millisecond', plural: 'milliseconds' },
    minute: { singular: 'minute', plural: 'minutes' },
    month: { singular: 'month', plural: 'months' },
    second: { singular: 'second', plural: 'seconds' },
    week: { singular: 'week', plural: 'weeks' },
    year: { singular: 'year', plural: 'years' }
  },
  short: {
    day: { singular: 'D', plural: 'D' },
    hour: { singular: 'hr', plural: 'hrs' },
    millisecond: { singular: 'ms', plural: 'ms' },
    minute: { singular: 'min', plural: 'min' },
    month: { singular: 'M', plural: 'M' },
    second: { singular: 'sec', plural: 'sec' },
    week: { singular: 'WK', plural: 'WKS' },
    year: { singular: 'YR', plural: 'YRS' }
  },
  veryShort: {
    day: { singular: 'd', plural: 'd' },
    hour: { singular: 'h', plural: 'h' },
    millisecond: { singular: 'm', plural: 'm' },
    minute: { singular: '\'', plural: '\'' },
    month: { singular: 'M', plural: 'M' },
    second: { singular: '\'\'', plural: '\'\'' },
    week: { singular: 'w', plural: 'w' },
    year: { singular: 'y', plural: 'y' }
  }
}

describe('tests for edge cases', () => {
  it('given NaN, should return 0 seconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(NaN, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.SECOND)
    const expected = '0 seconds'
    expect(result).toEqual(expected)
  })
  it('given a difference of 1 day, 15 hours, 35 minutes, should return 1D 15hrs 35min', () => {
    durationFormatter.initialize(config)
    const b = new Date('2025-09-08T18:25:00.000Z') // Monday, 8.9.2025, 18:25:00
    const e = new Date('2025-09-10T10:00:00.000Z') // Wednesday, 10.9.2025, 10:00:00
    const d = e.getTime() - b.getTime() // 1 day, 15 hours, 35 minutes
    const result = durationFormatter.format(d, b, DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.SECOND)
    const expected = '1D 15hrs 35min'
    expect(result).toEqual(expected)
  })
})

describe('tests for long output', () => {
  it('given zero, should return 0 seconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.SECOND)
    const expected = '0 seconds'
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 milliseconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '0 milliseconds'
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 years', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.YEAR)
    const expected = '0 years'
    expect(result).toEqual(expected)
  })
  it('given non zero, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(72642768219, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '2 years 3 months 20 days 18 hours 32 minutes 48 seconds and 219 milliseconds'
    expect(result).toEqual(expected)
  })
  it('given all ones, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(34045261001, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.LONG, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '1 year 1 month 1 day 1 hour 1 minute 1 second and 1 millisecond'
    expect(result).toEqual(expected)
  })
})

describe('tests for short output', () => {
  it('given zero, should return 0 seconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.SECOND)
    const expected = '0 sec'
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 milliseconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '0 ms'
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 years', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.YEAR)
    const expected = '0 YRS'
    expect(result).toEqual(expected)
  })
  it('given non zero, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(72642768219, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '2YRS 3M 20D 18hrs 32min 48sec 219ms'
    expect(result).toEqual(expected)
  })
  it('given all ones, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(34045261001, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '1YR 1M 1D 1hr 1min 1sec 1ms'
    expect(result).toEqual(expected)
  })
})

describe('tests for veryShort output', () => {
  it('given zero, should return 0 seconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.SECOND)
    const expected = '0 \'\''
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 milliseconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '0 m'
    expect(result).toEqual(expected)
  })
  it('given zero, should return 0 years', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(0, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.YEAR)
    const expected = '0 y'
    expect(result).toEqual(expected)
  })
  it('given non zero, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(72642768219, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '2y 3M 20d 18h 32\' 48\'\' 219m'
    expect(result).toEqual(expected)
  })
  it('given all ones, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(34045261001, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '1y 1M 1d 1h 1\' 1\'\' 1m'
    expect(result).toEqual(expected)
  })
  it('given < 24h duration, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45 + 1, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '14h 30\' 45\'\' 1m'
    expect(result).toEqual(expected)
  })
})

describe('tests for formatTillNow and veryShort output', () => {
  it('given zero, should return 0 seconds', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.formatTillNow(0, DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.SECOND)
    const expected = '0 \'\''
    expect(result).toEqual(expected)
  })
  it('given < 24h duration, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.formatTillNow(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45, DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '14h 30\' 45\'\''
    expect(result).toEqual(expected)
  })
  it('given > 24h duration, should return correct value', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.formatTillNow(1000 * 60 * 60 * 25, DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '1d 1h'
    expect(result).toEqual(expected)
  })
})

describe('tests for maxDisplayTop', () => {
  it('given nothing, should output all parts', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45 + 1, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND)
    const expected = '14h 30\' 45\'\' 1m'
    expect(result).toEqual(expected)
  })
  it('given 0, should output all parts', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45 + 1, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND, 0)
    const expected = '14h 30\' 45\'\' 1m'
    expect(result).toEqual(expected)
  })
  it('given 2, should output top2 parts', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45 + 1, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND, 2)
    const expected = '14h 30\''
    expect(result).toEqual(expected)
  })
  it('given 1, should output top 1 part', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.formatTillNow(1000 * 60 * 60 * 14 + 1000 * 60 * 30 + 1000 * 45, DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND, 1)
    const expected = '14 h'
    expect(result).toEqual(expected)
  })
  it('given 4, should output top 4 parts', () => {
    durationFormatter.initialize(config)
    const result = durationFormatter.format(72642768219, new Date('2022-02-10T00:00:00.000Z'), DurationFormatter.Verbosity.VERY_SHORT, DurationFormatter.TimeUnit.MILLISECOND, 4)
    const expected = '2y 3M 20d 18h'
    expect(result).toEqual(expected)
  })
})
