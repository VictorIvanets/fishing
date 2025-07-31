import type { WeatherT } from "./weather.types"

export type FishingPayloadT = {
  title: string
  description: string
  score: number
  date: string
  coords: [number, number]
  img: ImageT[]
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
  img: ImageT[]
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

export type FishingResponseT = {
  data: OneFishingT[]
  nextCursor: string | null
}

export type ImageT = {
  imgId: string
  url: string
}

export type ResponseForMapT = Pick<
  OneFishingT,
  "_id" | "title" | "coords" | "score" | "description" | "userId"
>
