import { useNavigate, useParams } from "react-router-dom"
import "./details.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import MaterialIcon from "src/shared/icons/Materialicons"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import { useEffect, useState } from "react"
import CkeckDelete from "./components/Delete/CkeckDelete"
import DetailsBlur from "./components/DetailsBlur/DetailBlur"
import PhotoUpload from "./components/PhotoUpload/PhotoUpload"
import PhotoSwiper from "./components/Swiper/Swiper"
import useDeleteFising from "src/hooks/useDeleteFising"
import type { ResponseGetPhoto } from "src/types/photo.types"
import { FaMapLocation } from "react-icons/fa6"
import Comments from "./components/Commens/Commens"
import { BsFillChatTextFill } from "react-icons/bs"
import useGetCommens from "src/hooks/useGetComments"
import useGetOneFishing from "src/hooks/useGetOneFishing"
import useGetPhotoInFolder from "src/hooks/useGetPhotoInFolder"
import { TiWeatherPartlySunny } from "react-icons/ti"
import Weather from "src/components/Weather/Weather"
const Details = () => {
  const navigate = useNavigate()
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)
  const { id } = useParams()
  const [deleteItem, setDeleteItem] = useState(false)
  const [uploadPhoto, setUploadPhoto] = useState(false)
  const [commentsView, setComments] = useState(false)
  const [weatherView, setWeatherView] = useState(false)
  const [timeruploadPhoto, setTimerUploadPhoto] = useState<
    ResponseGetPhoto[] | undefined
  >()
  const { deleteItem: deleteFising } = useDeleteFising()
  const { data, isError, error } = useGetOneFishing(id)
  const { photoData, isLoadingPhoto } = useGetPhotoInFolder(id)
  const { comments, isLoading } = useGetCommens(data?._id)

  useEffect(() => {
    setTimeout(() => {
      setTimerUploadPhoto(photoData)
    }, 500)
  }, [photoData])

  const normDate = data?.date.slice(0, 10).split("-")

  return (
    <FadeIn>
      <Flex relativ column centerV spredH gap={10} className="datails">
        {isError && <h2>{error?.message}</h2>}
        {data ? (
          <Flex className="datails__content" column>
            <Flex centerV spredV className="datails__author">
              <p className="upper">USER: {data.userName}</p>

              <h1 className="icomhover" onClick={() => navigate(-1)}>
                <MaterialIcon name="MdArrowBackIos" />
              </h1>
            </Flex>
            <h4 className="upper">{data.title}</h4>
            <Flex column className="datails__content__description">
              <p>{data.description}</p>
            </Flex>

            <Flex className="datails__content__footer" spredV gap={10}>
              <p>
                Дата: {normDate?.[2]} / {normDate?.[1]} /{normDate?.[0]}
              </p>

              <h2
                onClick={() => setWeatherView(!weatherView)}
                title="погода"
                className="datails__content__weather"
              >
                <TiWeatherPartlySunny />
              </h2>
              <p>Оцінка: {data.score}</p>
            </Flex>
            <Flex className="datails__content__buttonbar" spredV gap={10}>
              <a
                className="googlelink"
                href={`https://www.google.com/maps?ll=${data.coords[0]},${data.coords[1]}&q=${data.coords[0]},${data.coords[1]}`}
                target="_blank"
              >
                <Flex centerV row>
                  <h1 className="icomhover">
                    <MaterialIcon name="MdLocationPin" />
                  </h1>
                  <p>Google Map Link</p>
                </Flex>
              </a>
              <Flex
                title="показати на мапі"
                onClick={() =>
                  navigate("/mappage", {
                    state: {
                      oneFishing: data,
                    },
                  })
                }
                center
                className="datails__content__viewmap"
              >
                <h1 className="icomhover">
                  <FaMapLocation className="grad" />
                </h1>
              </Flex>
              <Flex
                title="коментарі"
                onClick={() => setComments(true)}
                center
                className="datails__content__comments"
              >
                <h1 className="icomhover">
                  <BsFillChatTextFill />
                </h1>
                {comments?.length && <p>{comments?.length}</p>}
              </Flex>

              {userId === data?.userId && (
                <Flex className="datails__content__buttonbar__btn" gap={20}>
                  <h1
                    className="icomhover"
                    title="загрузити фото"
                    onClick={() => setUploadPhoto(true)}
                  >
                    <MaterialIcon name="MdAddPhotoAlternate" />
                  </h1>
                  <h1
                    className="icomhover"
                    title="оновити дані"
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
                  <h1
                    className="icomhover"
                    title="видалити"
                    onClick={() => setDeleteItem(true)}
                  >
                    <MaterialIcon name="MdDeleteForever" />
                  </h1>
                </Flex>
              )}
            </Flex>
          </Flex>
        ) : (
          <Preloader />
        )}

        {(deleteItem || uploadPhoto || commentsView) && <DetailsBlur />}
        <Flex center className="datails__photobox">
          {timeruploadPhoto?.length && data ? (
            <PhotoSwiper fotoInFolder={timeruploadPhoto} data={data} />
          ) : isLoadingPhoto ? (
            <Preloader />
          ) : (
            <Flex center flex>
              {userId === data?.userId ? (
                <Flex onClick={() => setUploadPhoto(true)} column center>
                  <h1 className="icomhover" title="загрузити фото">
                    <MaterialIcon name="MdAddPhotoAlternate" />
                  </h1>
                  <h4 className="tacenter">
                    Ще немає фото.
                    <br />
                    Натисніть щоб загрузити свой фото,
                    <br />
                    для цієї рибалки
                  </h4>
                </Flex>
              ) : (
                <Flex column center>
                  <h4>Автор ще не додав сюди фото</h4>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
        {deleteItem && data && (
          <CkeckDelete
            deleteItem={() => deleteFising(data?._id)}
            navigate={() => navigate(`/mypage`)}
            title={data.title}
            setDeleteItem={setDeleteItem}
            titleCheck="Ви дійсно хочете видалити запис:"
          />
        )}
        {uploadPhoto && data && (
          <PhotoUpload data={data} setUploadPhoto={setUploadPhoto} />
        )}
        {commentsView && data && (
          <Comments
            comments={comments}
            isLoading={isLoading}
            data={data}
            setComments={setComments}
          />
        )}
        {weatherView && data && (
          <Weather setWeatherView={setWeatherView} data={data.weather} />
        )}
      </Flex>
    </FadeIn>
  )
}

export default Details
