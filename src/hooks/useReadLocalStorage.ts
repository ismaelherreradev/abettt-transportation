import { useCallback, useEffect, useState } from 'react'

import { parseJSON } from '@/utils'

type Value<T> = T | null

function useReadLocalStorage<T>(key: string): Value<T> {
  const readLocalStoredValue = useCallback((): Value<T> => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : null
    } catch (_) {
      return null
    }
  }, [key])

  const [storedValue, setStoredValue] = useState<Value<T>>(readLocalStoredValue)

  useEffect(() => {
    setStoredValue(readLocalStoredValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return storedValue
}

export default useReadLocalStorage
