import { useNavigate } from "react-router-dom"
import "./addpage.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import { useLocation } from "react-router-dom"
import type { LatLngLiteral } from "leaflet"
import { getWeatherApi } from "src/services/getWeather"
import { useEffect, useState } from "react"
import type { WeatherT } from "src/types/weather.types"
import {
  addFishingSchema,
  type AddFishingSchemaDataFields,
} from "./addFishingSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "src/components/Button/Button"
import type { FishingPayloadT, OneFishingT } from "src/types/fishing"
import MaterialIcon from "src/shared/icons/Materialicons"
import InputField from "src/components/Input/InputField"

type LocationState = {
  data?: OneFishingT
  position?: LatLngLiteral
}

const AddPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const [weather, setWeather] = useState<WeatherT | undefined>()

  const getWeather = async () => {
    const result = state.position && (await getWeatherApi(state.position))
    setWeather(result)
  }

  useEffect(() => {
    !weather && getWeather()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddFishingSchemaDataFields>({
    resolver: zodResolver(addFishingSchema),
    defaultValues: {
      title: state.data ? state.data?.title : "",
      description: state.data ? state.data?.description : "",
      score: state.data ? state.data?.score : 0,
      date: state.data ? state.data?.date : "",
    },
  })

  const submit = async (data: {
    title: string
    description: string
    score: number
    date: string
  }) => {
    if (weather && state.position && state.position.lat && state.position.lng) {
      const paramsFishing: FishingPayloadT = {
        title: data.title.replace(/\s+/g, " ").trim(),
        description: data.description.replace(/\s+/g, " ").trim(),
        score: data.score,
        date: data.date,
        coords: [state.position.lat, state.position.lng],
        img: [],
        weather: weather,
      }
      console.log("CREATE", paramsFishing) /////   GET CREATE
      navigate(`/mypage`)
    }
    reset()
  }

  const update = async (data: {
    title: string
    description: string
    score: number
    date: string
  }) => {
    if (state.data) {
      const updateParamsFishing: Omit<
        FishingPayloadT,
        "coords" | "img" | "weather"
      > = {
        title: data.title.replace(/\s+/g, " ").trim(),
        description: data.description.replace(/\s+/g, " ").trim(),
        score: data.score,
        date: data.date,
      }
      const putParams = { ...state.data, ...updateParamsFishing }

      console.log("UPDATE", putParams) /////   PUT UPDATE
      navigate(`/details/${state.data._id}`)
    }
    reset()
  }

  return (
    <FadeIn>
      <Flex column centerV spredV className="addpage">
        {state.data ? (
          <Flex column center>
            <h1 className="tacenter">Оновлення даних</h1>
            <p className="tacenter">
              Ви можете оновити тільки назву, опис, оцінку та дату
            </p>
            <p className="tacenter">
              Координати та погодні умови не змінюються
            </p>
          </Flex>
        ) : (
          <Flex column center>
            <h1 className="tacenter">Створіть запис про рибалку</h1>
            <p>Додайте назву, опис, оцінку та дату</p>
            <p className="tacenter">
              В описі, бажано, перерахувати що ловилося, та на що
            </p>
            <p>координати:</p>
            <p>{state.position?.lat}</p>
            <p>{state.position?.lng}</p>
          </Flex>
        )}
        <form
          onSubmit={handleSubmit(state.data ? update : submit)}
          className="login__submitform"
        >
          <Flex center column gap={25}>
            <Flex className="login__submitform__input" column gap={10}>
              <InputField
                id="input_title_add"
                label="Назва"
                {...register("title")}
                error={errors.title?.message}
              />
              <p className="addpage__descriptionarea">
                Опис. Наишіть що ловили, на що, чим...
              </p>
              <InputField
                id="input_description_add"
                {...register("description")}
                error={errors.description?.message}
                as="textarea"
                heightArea={170}
              />
              <Flex gap={10}>
                <InputField
                  id="input_score_add"
                  label="Оцінка"
                  type="number"
                  {...register("score", { valueAsNumber: true })}
                  error={errors.score?.message}
                />
                <InputField
                  ibackground
                  id="input_date_add"
                  label="Дата"
                  type="datetime-local"
                  {...register("date")}
                  error={errors.date?.message}
                />
              </Flex>
            </Flex>
            <Button
              isValid={isValid}
              type="submit"
              appearence="big"
              title="СТВОРИТИ"
            />
          </Flex>
        </form>

        <Flex className="addpage__back" onClick={() => navigate(-1)}>
          <h1>
            <MaterialIcon name="MdArrowBackIos" />
          </h1>
        </Flex>
      </Flex>
    </FadeIn>
  )
}

export default AddPage
