import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { IClient } from '../../features/clients/client.interface'
import { Ilatlng } from '../../components/map/Map.interface'

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: [] as IClient[],
  reducers: {
    addClient(state: IClient[], actions: PayloadAction<IClient[]>) {
      return [...state, ...actions.payload]
    },
    addRoute: (state: IClient[], actions: PayloadAction<Ilatlng & IClient>) => {
      const client = state.find(({ id }) => id === actions.payload.id)
      //  @ts-ignore
      client?.routes.push(actions.payload.routes)
    },
    removeRoute: (
      state: IClient[],
      actions: PayloadAction<Ilatlng & IClient>
    ) => {
      const client = state.find(({ id }) => id === actions.payload.id)
      const route = client?.routes.findIndex(
        (route) => actions.payload.lat === route.lat
      )
      //  @ts-ignore
      client?.routes.splice(route, 1)
    }
  }
})

export const { addClient, addRoute, removeRoute } = clientsSlice.actions
export const generateID = nanoid
export default clientsSlice.reducer
