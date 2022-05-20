import React, { FunctionComponent, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

import RoutingMachine from './RoutingMachine.component'
import { Ilatlng } from './Map.interface'

import { useAppSelector, useAppDispatch } from '../../hooks/useStore'
import { addRoute } from '../../features/clients/clientSlice'
import { IClient } from '../../features/clients/client.interface'
import useLocalStorage from '../../hooks/useLocalStorage'

const LocationMarker: FunctionComponent<{
  createPointer: (params: any) => any
  isSeletedUser: number | string
}> = (props) => {
  const [, setClient] = useLocalStorage('clients', [] as IClient[])
  const AllClients = useAppSelector((state) => state.clients)
  const dispatch = useAppDispatch()

  useMapEvents({
    async click(e) {
      if (props.isSeletedUser) {
        await dispatch(
          //  @ts-ignore
          addRoute({ id: props.isSeletedUser, routes: { ...e?.latlng } })
        )

        return
      }

      props.createPointer({ ...e?.latlng })
    }
  })

  useEffect(() => {
    setClient([...AllClients])
  }, [AllClients, setClient])

  return null
}

const Map: FunctionComponent<{ openModal: () => any }> = (props) => {
  const seletedClient = useAppSelector((state) => state.currentClient)
  const client = useAppSelector((state) => state.clients)
  /* @ts-ignore */
  const currentClient = client.find((client) => client.id === seletedClient.id)

  const currentRoute = currentClient || seletedClient

  const userRoutes: Ilatlng[] = [...currentRoute!.routes]

  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        createPointer={props.openModal}
        isSeletedUser={currentClient?.id!}
      />
      <RoutingMachine
        //  @ts-ignore
        routes={userRoutes}
      />
    </MapContainer>
  )
}

export default Map
