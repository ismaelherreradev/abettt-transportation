import { FunctionComponent, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

import RoutingMachine from './RoutingMachine.component'
import { Ilatlng } from './Map.interface'

import { useAppSelector } from '@/hooks/useStore'
import { IClient } from '@/features/clients/client.interface'
import useLocalStorage from '@/hooks/useLocalStorage'

const LocationMarker: FunctionComponent<{
  createPointer: (params: any) => any
}> = (props) => {
  const [, setClient] = useLocalStorage('clients', [] as IClient[])
  const AllClients = useAppSelector((state) => state.clients)

  useMapEvents({
    click(e) {
      props.createPointer({ ...e?.latlng })
    }
  })

  useEffect(() => {
    setClient([...AllClients])
  }, [AllClients, setClient])

  return null
}

const Map: FunctionComponent<{ openModal: () => any }> = (props) => {
  const clients = useAppSelector((state) => state.clients)
  const userRoutes: Ilatlng[] = clients.flatMap((r) => r.routes)

  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker createPointer={props.openModal} />
      <RoutingMachine
        //  @ts-ignore
        routes={userRoutes}
      />
    </MapContainer>
  )
}

export default Map
