import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Imodal } from '../../features/modals/modal.interface'

const initialState: Imodal = {
  open: false,
  openWhitParams: false,
  params: {
    name: '',
    lat: '',
    lng: ''
  }
} as Imodal

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    openModal: (state: Imodal) => {
      state.open = true
    },
    closeModal: (state: Imodal) => {
      state.open = false
      state.openWhitParams = false
      state.params = { name: '', lat: '', lng: '' }
    },
    openModalWithParams: (state: Imodal, actions: PayloadAction<Imodal>) => {
      state.open = true
      state.openWhitParams = true
      state.params = { ...state.params, ...actions.payload }
    }
  }
})

export const { openModal, closeModal, openModalWithParams } =
  clientsSlice.actions
export default clientsSlice.reducer
