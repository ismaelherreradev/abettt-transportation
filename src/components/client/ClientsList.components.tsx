import React, { Fragment, FunctionComponent } from 'react'

import {
  List,
  ListSubheader,
  ListItem,
  IconButton,
  ListItemText,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { IClient } from '@/features/clients/client.interface'

import { useAppDispatch } from '@/hooks/useStore'
import { removeRoute } from '@/features/clients/clientSlice'

const ClientsList: FunctionComponent<{ clients: IClient[] }> = (list) => {
  const dispatch = useAppDispatch()

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="client-list-subheader"
      subheader={
        <ListSubheader component="div" id="client-list-subheader">
          Clients
        </ListSubheader>
      }>
      {list.clients.length > 0 &&
        list.clients.map((client) => {
          return (
            <Fragment key={client.id}>
              <ListItem>
                <ListItemText primary={client.name} />
              </ListItem>

              <List component="div">
                {client.routes.map((route, index) => {
                  return (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            dispatch(
                              // @ts-ignore
                              removeRoute({ id: client.id })
                            )
                          }>
                          <DeleteIcon />
                        </IconButton>
                      }>
                      <Typography
                        noWrap
                        variant="overline">{`${route.lat}, ${route.lng}`}</Typography>
                    </ListItem>
                  )
                })}
              </List>
            </Fragment>
          )
        })}
    </List>
  )
}

export default ClientsList
