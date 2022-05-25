import { renderHook } from '@testing-library/react'
import useEffectOnce from '@/hooks/useEffectOnce'

describe('use effect once()', () => {
  test('should be triggered only once', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useEffectOnce(effect))

    expect(effect).toHaveBeenCalledTimes(1)

    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })
})
