import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IClient } from '../../features/clients/client.interface'

const initialState: IClient = {
  id: '',
  name: '',
  routes: []
} as IClient

export const currentClientSlice = createSlice({
  name: 'currentClient',
  initialState,
  reducers: {
    setCurrentClient: (state: IClient, actions: PayloadAction<IClient>) => {
      state.id = actions.payload.id
      state.name = actions.payload.name
      state.routes = actions.payload.routes
    },
    resetCurrentClient: (state: IClient) => {
      state.id = ''
      state.name = ''
      state.routes = []
    }
  }
})

export const { setCurrentClient, resetCurrentClient } =
  currentClientSlice.actions
export default currentClientSlice.reducer
