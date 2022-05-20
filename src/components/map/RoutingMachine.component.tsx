import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
// import { createControlComponent } from '@react-leaflet/core'

import { useMap } from 'react-leaflet'

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
})

const RoutingMachine = (waypoints: []) => {
  const map = useMap()
  // @ts-ignore
  useEffect(() => {
    if (!map) return

    const routingControl = L.Routing.control({
      // @ts-ignore
      waypoints: Object.values(waypoints.routes),
      // @ts-ignore
      lineOptions: {
        styles: [{ color: 'black', opacity: 1, weight: 2 }],
        addWaypoints: false
      },
      addWaypoints: true,
      routeWhileDragging: true
    }).addTo(map)

    return () => map.removeControl(routingControl)
  }, [map, waypoints])

  return null
}

export default RoutingMachine
