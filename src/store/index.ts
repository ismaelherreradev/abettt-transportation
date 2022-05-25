import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '@/features/clients/clientSlice'
import modalReducer from '@/features/modals/modalSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    clientModal: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
