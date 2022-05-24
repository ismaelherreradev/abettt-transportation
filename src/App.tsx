import { useState } from 'react'
import { Grid, CssBaseline, Box, Fab, Drawer } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import ClientForm from './components/client/ClientForm.component'
import ClientModal from './components/client/ClientModal.component'
import ClientsList from './components/client/ClientsList.components'

import Map from './components/map/Map.component'

import { useAppSelector, useAppDispatch } from './hooks/useStore'
import useReadLocalStorage from './hooks/useReadLocalStorage'
import useEffectOnce from './hooks/useEffectOnce'

import { openModalWithParams, openModal } from './features/modals/modalSlice'
import { addClient } from './features/clients/clientSlice'
import {
  setCurrentClient,
  resetCurrentClient
} from './features/clients/currentClientSlice'

import { IClient } from './features/clients/client.interface'
import { Imodal } from './features/modals/modal.interface'

function App() {
  const [showDrawer, setShowDrawer] = useState(false)
  const storedClients = useReadLocalStorage('clients')
  const storedSeletedClient = useReadLocalStorage('seletedClient')
  const open = useAppSelector((state) => state.clientModal.open)
  const clients = useAppSelector((state) => state.clients)
  const currentUser = useAppSelector((state) => state.currentClient.name)

  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    if (storedClients) {
      dispatch(addClient(storedClients as IClient[]))
    }

    if (storedSeletedClient) {
      dispatch(setCurrentClient(storedSeletedClient as IClient))
    }
  })

  const createPointer = (params: Imodal) => {
    return dispatch(openModalWithParams(params))
  }

  const createClient = () => {
    dispatch(openModal())
    dispatch(resetCurrentClient())
  }

  return (
    <>
      <CssBaseline />
      <ClientModal open={open}>
        <ClientForm />
      </ClientModal>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        variant="temporary">
        <Box sx={{ width: '300px' }}>
          <ClientsList clients={clients} />
        </Box>
      </Drawer>
      <Grid>
        {/* @ts-ignore */}
        <Map openModal={createPointer} />
        <Box
          sx={{ position: 'absolute', left: '50%', top: 0, marginTop: '10px' }}>
          <Fab aria-label="clients" onClick={() => setShowDrawer(true)}>
            <img
              src="./assets/images/apple-touch-icon.png"
              alt="ABETT"
              style={{ width: '60px' }}
            />
          </Fab>
        </Box>
        {currentUser && (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 10,
              marginBottom: '10px'
            }}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="current user">
              {currentUser}
            </Fab>
          </Box>
        )}
        <Box
          sx={{
            position: 'absolute',
            right: '0',
            bottom: 10,
            marginRight: '10px',
            marginBottom: '10px'
          }}>
          <Fab color="primary" aria-label="add" onClick={() => createClient()}>
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </>
  )
}

export default App
