import React, { Fragment, FunctionComponent } from 'react'

import {
  List,
  ListSubheader,
  ListItem,
  IconButton,
  ListItemText,
  Collapse,
  Radio,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { IClient } from '../../features/clients/client.interface'

import useLocalStorage from '../../hooks/useLocalStorage'

import { useAppSelector, useAppDispatch } from '../../hooks/useStore'
import { setCurrentClient } from '../../features/clients/currentClientSlice'
import { removeRoute } from '../../features/clients/clientSlice'
const ClientsList: FunctionComponent<{ clients: IClient[] }> = (list) => {
  const [, setSeletedClient] = useLocalStorage('seletedClient', {} as IClient)
  const currentClient = useAppSelector((state) => state.currentClient)
  const dispatch = useAppDispatch()

  const saveCurrentClient = (client: IClient) => {
    setSeletedClient(client)
    return dispatch(setCurrentClient(client))
  }

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
      {list.clients.length &&
        list.clients.map((client) => {
          return (
            <Fragment key={client.id}>
              <ListItem
                secondaryAction={
                  <Radio
                    size="small"
                    checked={currentClient.id === client.id}
                    onClick={() => saveCurrentClient(client)}
                    value={client}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                }>
                <ListItemText primary={client.name} />
              </ListItem>
              <Collapse
                in={currentClient.id === client.id}
                timeout="auto"
                unmountOnExit>
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
                                removeRoute({ id: client.id, lat: route.lat })
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
              </Collapse>
            </Fragment>
          )
        })}
    </List>
  )
}

export default ClientsList
