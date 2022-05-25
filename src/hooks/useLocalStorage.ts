import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { parseJSON } from '@/utils'

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readLocalStoredValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (_) {
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(readLocalStoredValue)
  const setValueRef = useRef<SetValue<T>>()

  setValueRef.current = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value
    window.localStorage.setItem(key, JSON.stringify(newValue))
    setStoredValue(newValue)
  }

  const setValue: SetValue<T> = useCallback(
    (value) => setValueRef.current?.(value),
    []
  )

  useEffect(() => {
    setStoredValue(readLocalStoredValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}

export default useLocalStorage
