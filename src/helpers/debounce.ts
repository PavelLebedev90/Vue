export const debounced = (callback: (...args: any[]) => void, ms: number) => {
  let timerId: any
  return () => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(callback, ms)
  }
}
