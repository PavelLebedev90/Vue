export const debounced = (callback: (...args: any[]) => void, ms: number) => {
  let timerId: any
  let prevField = '';
  return (validateField: 'count' | 'email') => {
    if (timerId && prevField === validateField) {
      clearTimeout(timerId)
    }
    prevField = validateField
    timerId = setTimeout(()=>callback(validateField), ms)
  }
}
