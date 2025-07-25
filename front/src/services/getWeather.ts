import axios, { AxiosError } from "axios"
import type { LatLngLiteral } from "leaflet"
import type { WeatherT } from "src/types/weather.types"

export const getWeatherApi = async (
  coords: LatLngLiteral
): Promise<WeatherT> => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: `${coords.lat}`,
          lon: `${coords.lng}`,
          appid: "c37d5a8e792375836f2aa82ac92089f5",
          lang: "ua",
          units: "metric",
        },
      }
    )

    return Object.assign(
      {},
      ...[data.main, { sky: data.weather[0].description }, data.wind]
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data) {
        throw new Error(e.response.data.message)
      }
      throw new Error(e.message)
    }
    throw new Error("Unexpected error")
  }
}
