import { useState } from 'react'
import { Grid, CssBaseline, Box, Fab, Drawer, Typography } from '@mui/material'

import ClientForm from '@/components/client/ClientForm.component'
import ClientModal from '@/components/client/ClientModal.component'
import ClientsList from '@/components/client/ClientsList.component'

import Map from '@/components/map/Map.component'

import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import useReadLocalStorage from '@/hooks/useReadLocalStorage'
import useEffectOnce from '@/hooks/useEffectOnce'

import { openModalWithParams } from '@/features/modals/modalSlice'
import { addClient } from '@/features/clients/clientSlice'

import { IClient } from '@/features/clients/client.interface'
import { Imodal } from '@/features/modals/modal.interface'

import Logo from './assets/images/apple-touch-icon.png'

function App() {
  const [showDrawer, setShowDrawer] = useState(false)
  const storedClients = useReadLocalStorage('clients')
  const open = useAppSelector((state) => state.clientModal.open)
  const clients = useAppSelector((state) => state.clients)

  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    if (storedClients) {
      dispatch(addClient(storedClients as IClient[]))
    }
  })

  const createPointer = (params: Imodal) => {
    return dispatch(openModalWithParams(params))
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
          sx={{
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            left: '0',
            bottom: 0,
            margin: '10px',
            gap: 3
          }}>
          <Fab aria-label="logo">
            <img src={Logo} alt="ABETT" style={{ width: '60px' }} />
          </Fab>
          <Fab
            aria-label="clients"
            variant="extended"
            onClick={() => setShowDrawer(true)}>
            <Typography>Open clients list</Typography>
          </Fab>
        </Box>
      </Grid>
    </>
  )
}

export default App
