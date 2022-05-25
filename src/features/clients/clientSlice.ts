import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { IClient } from '@/features/clients/client.interface'

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: [] as IClient[],
  reducers: {
    addClient(state: IClient[], actions: PayloadAction<IClient[]>) {
      return [...state, ...actions.payload]
    },
    removeRoute: (state: IClient[], actions: PayloadAction<IClient>) => {
      return state.filter((client) => client.id !== actions.payload.id)
    }
  }
})

export const { addClient, removeRoute } = clientsSlice.actions
export const generateID = nanoid
export default clientsSlice.reducer
