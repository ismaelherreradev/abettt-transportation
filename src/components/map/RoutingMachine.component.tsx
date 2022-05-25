import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'

import { useMap } from 'react-leaflet'

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
