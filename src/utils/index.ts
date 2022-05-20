export const parseJSON = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    return undefined
  }
}

export const validLatAndLongRegex =
  // eslint-disable-next-line no-useless-escape
  /^((\-?|\+?)?\d+(\.\d+)?)\s*((\-?|\+?)?\d+(\.\d+)?)$/gi
