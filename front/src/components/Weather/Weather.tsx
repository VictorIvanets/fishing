import type { WeatherT } from "src/types/weather.types"
import "./weather.sass"
import { useEffect, useState } from "react"
import { getWeatherApi } from "src/services/getWeather"
import type { LatLngLiteral } from "leaflet"
import Flex from "../Flex/Flex"
import FadeIn from "../FadeIn/FadeIn"
interface WeatherProps {
  data?: WeatherT
  coords?: LatLngLiteral
  setWeatherView: React.Dispatch<React.SetStateAction<boolean>>
}
const Weather = ({ data, coords, setWeatherView }: WeatherProps) => {
  const [getData, setGetData] = useState<WeatherT>()

  const getWeather = async (coords: LatLngLiteral) => {
    const res = await getWeatherApi(coords)
    setGetData(res)
  }

  useEffect(() => {
    if (data) setGetData(data)
    if (coords) getWeather(coords)
  }, [data, coords])

  let wind
  if (getData) {
    const wd = getData.deg

    if ((wd >= 0 && wd <= 45) || (wd >= 320 && wd <= 360)) {
      wind = "Північний"
    }
    if (wd >= 46 && wd <= 130) {
      wind = "Східний"
    }
    if (wd >= 131 && wd <= 230) {
      wind = "Південний"
    }
    if (wd >= 231 && wd <= 319) {
      wind = "Західний"
    }
  }

  return (
    <FadeIn onClick={() => setWeatherView(false)} className="weather">
      <Flex gap={8} column center>
        <h3 className="tacenter upper">погода на момент створення запису</h3>
        <Flex className="weather__content" gap={5} column>
          <p> {getData?.sky.toUpperCase()} </p>
          <p>
            <span>Tемпература:</span> {getData?.temp} °C
          </p>
          <p>
            <span>Вологість:</span> {getData?.humidity} %
          </p>
          <p>
            <span>Тиск:</span> {getData?.grnd_level} hPa
          </p>
          <p>
            <span>Вітер:</span> {wind} {getData?.speed} м/с
          </p>
        </Flex>
        <p className="tacenter">
          ⚠ данні атоматично встановлюються <br />
          під час створення запису, <br />
          за координатами вибраними на мапі
        </p>
      </Flex>
    </FadeIn>
  )
}

export default Weather
