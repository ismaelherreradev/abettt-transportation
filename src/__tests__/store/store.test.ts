import { store } from '@/store'

test('store', () => {
  const state = store.getState()

  expect(state).toEqual({
    clients: [],
    clientModal: {
      open: false,
      openWhitParams: false,
      params: { name: '', lat: '', lng: '' }
    }
  })
})
