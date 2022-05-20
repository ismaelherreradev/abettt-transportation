import { Ilatlng } from '../../components/map/Map.interface'

export interface IClient {
  id: number | string
  name: string
  routes: Ilatlng[] | []
}
