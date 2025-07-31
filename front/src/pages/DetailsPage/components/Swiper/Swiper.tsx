import { PREFIX_STATIC } from "src/api/PREFIX"
import "./swiper.sass"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import type { ResponseGetPhoto } from "src/types/photo.types"
import MaterialIcon from "src/shared/icons/Materialicons"
import CkeckDelete from "../Delete/CkeckDelete"
import { useEffect, useRef, useState } from "react"
import { Swiper as SwiperType } from "swiper/types"
import type { OneFishingT } from "src/types/fishing"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import useDeletePhoto from "src/hooks/useDeletePhoto"

interface SwiperProps {
  fotoInFolder: ResponseGetPhoto[]
  data: OneFishingT
}
const PhotoSwiper = ({ fotoInFolder, data }: SwiperProps) => {
  const [deleteItem, setDeleteItem] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)

  const { deletePhoto } = useDeletePhoto(data._id)

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = !deleteItem
    }
  }, [deleteItem])

  return (
    <div className="swiperpage">
      <Swiper
        className="swiperbox"
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {[...fotoInFolder].reverse().map((i, index) => (
          <SwiperSlide key={index} className="swiperpage__item">
            <div className="swiperpage__picbox">
              <img
                className="swiperpage__img"
                src={`${PREFIX_STATIC}static/${data._id}/${i.originalname}`}
              />
              {userId === data.userId && (
                <h1
                  title="видалити фото"
                  onClick={() => setDeleteItem(true)}
                  className="swiperpage__picbox__delete icomhover"
                >
                  <MaterialIcon name="MdDeleteForever" />
                </h1>
              )}
              {deleteItem && (
                <CkeckDelete
                  deleteItem={() => {
                    deletePhoto({ photoId: i._id, setId: data._id })
                    setDeleteItem(false)
                  }}
                  setDeleteItem={setDeleteItem}
                  titleCheck="Ви дійсно хочете видалити це фото?"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PhotoSwiper
