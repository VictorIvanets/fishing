import type { WeatherT } from "./weather.types"

export type FishingPayloadT = {
  title: string
  description: string
  score: number
  date: string
  coords: [number, number]
  img: []
  weather: WeatherT
}

export type OneFishingT = {
  _id: string
  folderName: number
  userName: string
  userId: string
  title: string
  description: string
  score: number
  date: string
  coords: [number, number]
  db: string
  img: []
  weather: {
    deg: number
    feels_like: number
    grnd_level: number
    gust: number
    humidity: number
    pressure: number
    sea_level: number
    sky: string
    speed: number
    temp: number
    temp_max: number
    temp_min: number
  }
  createdA: string
  updatedAt: string
}
