import { useNavigate, useParams } from "react-router-dom"
import "./details.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import MaterialIcon from "src/shared/icons/Materialicons"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "src/types/constants"
import { fishingServices } from "src/services/fishing.services"
import { Preloader } from "src/components/preloaders/PreloaderBall"
const Details = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const { data, isError, error } = useQuery({
    queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
    queryFn: () => fishingServices.getOne(id!),
    enabled: !!id,
  })

  const normDate = data?.date.slice(0, 10).split("-")

  return (
    <FadeIn>
      <Flex relativ column centerV spredH className="datails">
        {isError && <h2>{error.message}</h2>}
        {data ? (
          <Flex className="datails__content" column>
            <Flex centerV spredV className="datails__author">
              <p>Автор: {data.userName}</p>

              <h1 onClick={() => navigate(-1)}>
                <MaterialIcon name="MdArrowBackIos" />
              </h1>
            </Flex>
            <h4>{data.title}</h4>
            <p>{data.description}</p>

            <Flex className="datails__content__footer" spredV gap={10}>
              <p>
                Дата: {normDate?.[2]} / {normDate?.[1]} /{normDate?.[0]}
              </p>
              <p>Оцінка: {data.score}</p>
            </Flex>
            <Flex className="datails__content__buttonbar" spredV gap={10}>
              <a
                className="googlelink"
                href={`https://www.google.com/maps?ll=${data.coords[0]},${data.coords[1]}&q=${data.coords[0]},${data.coords[1]}`}
                target="_blank"
              >
                <Flex centerV row>
                  <h1>
                    <MaterialIcon name="MdLocationPin" />
                  </h1>
                  <p>Google Map Link</p>
                </Flex>
              </a>
              <Flex className="datails__content__buttonbar__btn" gap={20}>
                <h1>
                  <MaterialIcon name="MdAddPhotoAlternate" />
                </h1>
                <h1
                  onClick={() =>
                    navigate("/addpage", {
                      state: {
                        data,
                      },
                    })
                  }
                >
                  <MaterialIcon name="MdOutlineUpdate" />
                </h1>
                <h1>
                  <MaterialIcon name="MdDeleteForever" />
                </h1>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Preloader />
        )}

        <Flex className="datails__photobox"></Flex>
      </Flex>
    </FadeIn>
  )
}

export default Details
