import { Debouncer } from '../../src/utils/debouncer'

describe('Debouncer general options', () => {
  describe('enqueueing option', () => {
    it('should call the enqueueing function before enqueuing a function', async () => {
      jest.useFakeTimers()
      const enqueueingMock = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 50)))
      const debouncer = new Debouncer(100, { enqueueing: enqueueingMock })
      const func = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 50)))

      debouncer.debounce(func)

      // The enqueueing function should be called first
      expect(enqueueingMock).toHaveBeenCalledTimes(1)
      expect(func).not.toHaveBeenCalled()

      // Fast forward time to execute the debounced function
      jest.advanceTimersByTime(150)
      await Promise.resolve() // Ensure any pending async calls resolve
      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('ending option', () => {
    it('should call the ending function after executing the last debounced function', async () => {
      jest.useFakeTimers()
      const endingMock = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 50)))
      const debouncer = new Debouncer(100, { ending: endingMock })
      const func = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 50)))

      const promises: Array<Promise<any>> = []
      for (let i = 0; i < 5; i++) {
        promises.push(debouncer.debounce(func))
      }

      // Advance timers to execute the first debounced function
      jest.advanceTimersByTime(100)

      // Await the first function call completion
      await Promise.all(promises)
      expect(func).toHaveBeenCalledTimes(1)
      expect(endingMock).not.toHaveBeenCalled()

      // Now advance timers by enough time for the last debounced function to be executed
      jest.advanceTimersByTime(150)
      await Promise.resolve() // Ensure any pending promises are resolved

      // The ending function should now have been called once
      expect(endingMock).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Debouncer deferred execution', () => {
  let debouncer: Debouncer

  beforeEach(() => {
    jest.useFakeTimers()
    debouncer = new Debouncer(100, { startImmediately: false })
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should debounce a function', async () => {
    const func = jest.fn()
    await debouncer.debounce(func)

    expect(func).not.toHaveBeenCalled()

    // Advance time to trigger the function
    jest.advanceTimersByTime(200)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should debounce fast follow-up function', async () => {
    const func1 = jest.fn()
    const func2 = jest.fn()

    await debouncer.debounce(func1)
    await debouncer.debounce(func2)

    expect(func1).not.toHaveBeenCalled()
    expect(func2).not.toHaveBeenCalled()

    // Advance time to execute the last function
    jest.advanceTimersByTime(200)
    expect(func1).not.toHaveBeenCalled()
    expect(func2).toHaveBeenCalledTimes(1)
  })

  it('should execute the last function', async () => {
    const func1 = jest.fn()
    const func2 = jest.fn()

    await debouncer.debounce(func1)
    await debouncer.debounce(func2)

    expect(func1).not.toHaveBeenCalled()
    expect(func2).not.toHaveBeenCalled()

    // Debounce another function after a short delay
    jest.advanceTimersByTime(50)
    await debouncer.debounce(func1)

    expect(func1).not.toHaveBeenCalled()
    expect(func2).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)
    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).not.toHaveBeenCalled()
  })

  it('should not call the last function while waiting for the previous operation to complete', async () => {
    jest.useFakeTimers()

    const debouncer = new Debouncer(100)

    // Define and enqueue a function that takes some time to complete
    const longRunningFunc = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 500)))
    debouncer.debounce(longRunningFunc)

    // Immediately enqueue another function while the first one is still running
    const lastFunc = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))
    debouncer.debounce(lastFunc)

    // Advance timers to allow the first function to start
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure async tasks are handled
    expect(longRunningFunc).toHaveBeenCalledTimes(1)

    // Advance timers further to let the first function complete
    jest.advanceTimersByTime(500)
    await Promise.resolve()

    expect(lastFunc).toHaveBeenCalledTimes(1)
  })
})

describe('Debouncer immediate execution', () => {
  let debouncer: Debouncer

  beforeEach(() => {
    jest.useFakeTimers()
    debouncer = new Debouncer(100)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should immediately execute func1 and debounce func2', async () => {
    const func1 = jest.fn()
    const func2 = jest.fn()

    await debouncer.debounce(func1)
    await debouncer.debounce(func2)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).not.toHaveBeenCalled()

    // Advance time to trigger func2
    jest.advanceTimersByTime(200)
    expect(func2).toHaveBeenCalledTimes(1)
  })

  it('should debounce middle function', async () => {
    const func1 = jest.fn()
    const func2 = jest.fn()
    const func3 = jest.fn()

    await debouncer.debounce(func1)
    await debouncer.debounce(func2)
    await debouncer.debounce(func3)

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).not.toHaveBeenCalled()
    expect(func3).not.toHaveBeenCalled()

    // Advance time to trigger func3
    jest.advanceTimersByTime(200)
    expect(func2).not.toHaveBeenCalled()
    expect(func3).toHaveBeenCalledTimes(1)
  })
})

describe('Debouncer without timeout but async function duration', () => {
  it('should execute a single func', async () => {
    jest.useFakeTimers()
    const debouncer = new Debouncer()
    const func1 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))

    debouncer.debounce(func1)

    // Advance time to trigger the function
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure async behavior resolves

    expect(func1).toHaveBeenCalledTimes(1)
  })

  it('should execute two funcs', async () => {
    jest.useFakeTimers()

    const debouncer = new Debouncer()
    const func1 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))
    const func2 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))

    debouncer.debounce(func1)
    debouncer.debounce(func2)

    // Advance timers to ensure the first function runs
    jest.advanceTimersByTime(100) // Wait for func1 to finish
    await Promise.resolve() // Ensure func1 has fully resolved

    // Advance timers to ensure the second function runs
    jest.advanceTimersByTime(100) // Wait for func2 to finish
    await Promise.resolve() // Ensure func2 has fully resolved

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledTimes(1)
  })

  it('should debounce middle func', async () => {
    jest.useFakeTimers()

    const debouncer = new Debouncer(100)
    const func1 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))
    const func2 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))
    const func3 = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))

    debouncer.debounce(func1) // Enqueue func1
    debouncer.debounce(func2) // Enqueue func2 (should be debounced)
    debouncer.debounce(func3) // Enqueue func3 (should be the last one executed)

    // Advance timers to execute func1
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure func1 has fully resolved

    // Advance timers to allow func3 to run after func1
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure func3 has fully resolved

    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).toHaveBeenCalledTimes(0)
    expect(func3).toHaveBeenCalledTimes(1)
  })

  it('should debounce an async function without a timeout', async () => {
    jest.useFakeTimers()

    const debouncer = new Debouncer()
    const func = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Enqueue the function multiple times (7 times)
    for (let i = 0; i < 7; i++) {
      debouncer.debounce(func)
    }

    // Advance timers to execute the first function
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure the first function runs completely

    // Advance timers again to allow the last function to run after the first one
    jest.advanceTimersByTime(100)
    await Promise.resolve() // Ensure any pending promises resolve

    expect(func).toHaveBeenCalledTimes(2)
  })
})
