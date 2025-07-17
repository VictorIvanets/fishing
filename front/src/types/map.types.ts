export type CoordsT = {
  latitude: number | undefined
  longitude: number | undefined
}

export interface MapState {
  coords: CoordsT | undefined
  errorMassege: string | undefined
  isLoading: boolean
}
