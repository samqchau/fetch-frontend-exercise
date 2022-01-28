type cb = { (): void }

export const timeoutWrapper = (callback: cb, seconds: number) => {
  setTimeout(() => {
    callback()
  }, seconds * 1000)
}
