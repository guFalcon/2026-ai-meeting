import { singleton as dateUtils } from '../../src/utils/dateUtils'

describe('isoToDate()', () => {
  it('should convert an ISO date string to a localized date string', () => {
    const isoDate = '2022-01-01T00:00:00.000'
    const date = new Date(isoDate + 'Z')
    const locale = 'de-AT'
    const expected = date.toLocaleDateString(locale)
    expect(dateUtils.isoToDate(isoDate, locale)).toEqual(expected)
  })
})

describe('isoToDatePadded()', () => {
  it('should convert an ISO date string to a padded localized date string', () => {
    const isoDate = '2022-01-01T00:00:00.000'
    const date = new Date(isoDate + 'Z')
    const locale = 'de-AT'
    let expected = date.toLocaleDateString(locale)
    expected = expected
      .split('.')
      .map((v) => (v.length === 1 ? dateUtils.pad(v) : v))
      .join('.')
    expect(dateUtils.isoToDatePadded(isoDate, locale)).toEqual(expected)
  })
})

describe('monthDiff()', () => {
  it('should return the number of months between two dates', () => {
    const from = new Date('2021-01-01T00:00:00.000Z')
    const to = new Date('2022-01-01T00:00:00.000Z')
    const expected = 12
    expect(dateUtils.monthDiff(from, to)).toEqual(expected)
  })

  it('should return 0 if the difference is negative', () => {
    const from = new Date('2022-01-01T00:00:00.000Z')
    const to = new Date('2021-01-01T00:00:00.000Z')
    const expected = 0
    expect(dateUtils.monthDiff(from, to)).toEqual(expected)
  })
})

describe('isoToTime()', () => {
  it('should convert an ISO date string to a localized time string', () => {
    const isoDate = '2022-01-01T12:34:56.000'
    const date = new Date(isoDate + 'Z')
    const locale = 'de-AT'
    const expected = date.toLocaleTimeString(locale)
    expect(dateUtils.isoToTime(isoDate, locale)).toEqual(expected)
  })
})

describe('isoToShortTime()', () => {
  it('should convert an ISO date string to a localized short time string', () => {
    const isoDate = '2022-01-01T12:34:56.000'
    const date = new Date(isoDate + 'Z')
    const locale = 'de-AT'
    let expected = date.toLocaleTimeString(locale)
    expected = expected.substring(0, expected.lastIndexOf(':'))
    expect(dateUtils.isoToShortTime(isoDate, locale)).toEqual(expected)
  })
})

describe('isoToShortDateTime()', () => {
  it('should convert an ISO date string to a localized short date and time string', () => {
    const isoDate = '2022-01-01T12:34:56.000'
    const date = new Date(isoDate + 'Z')
    const locale = 'de-AT'
    let expected = date.toLocaleDateString(locale)
    expected = expected
      .split('.')
      .map((v) => (v.length === 1 ? dateUtils.pad(v) : v))
      .join('.')
    expected += ' ' + date.toLocaleTimeString(locale)
    expected = expected.substring(0, expected.lastIndexOf(':'))
    expect(dateUtils.isoToShortDateTime(isoDate, locale)).toEqual(expected)
  })
})

describe('roundTimeToQuater()', () => {
  it('should round a time to the nearest quarter hour', () => {
    const time = new Date('2022-01-01T12:34:56.000Z')
    const expected = new Date('2022-01-01T12:30:00.000Z').getTime()
    expect(dateUtils.roundTimeToQuater(time)).toEqual(expected)
  })

  it('should round up to the next quarter hour if the time is closer to the next quarter hour', () => {
    const time = new Date('2022-01-01T12:40:56.000Z')
    const expected = new Date('2022-01-01T12:45:00.000Z').getTime()
    expect(dateUtils.roundTimeToQuater(time, false)).toEqual(expected)
  })

  it('should round down to the previous quarter hour if the time is closer to the previous quarter hour', () => {
    const time = new Date('2022-01-01T12:22:56.000Z')
    const expected = new Date('2022-01-01T12:15:00.000Z').getTime()
    expect(dateUtils.roundTimeToQuater(time)).toEqual(expected)
  })

  it('should return the same time if the time is already on a quarter hour', () => {
    const time = new Date('2022-01-01T12:30:00.000Z')
    expect(dateUtils.roundTimeToQuater(time)).toEqual(time.getTime())
  })
})
