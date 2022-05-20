import React, { ReactNode, FunctionComponent } from 'react'
import { Modal, Backdrop, Fade, Box } from '@mui/material'

import { useAppDispatch } from '../../hooks/useStore'
import { closeModal } from '../../features/modals/modalSlice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
}

const ClientModal: FunctionComponent<{
  open: boolean
  children: ReactNode
}> = ({ open, children }) => {
  //* @ts-ignore *
  const dispatch = useAppDispatch()

  return (
    <>
      {open && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => dispatch(closeModal())}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}>
          <Fade in={true}>
            <Box sx={style}>{children}</Box>
          </Fade>
        </Modal>
      )}
    </>
  )
}

export default ClientModal
