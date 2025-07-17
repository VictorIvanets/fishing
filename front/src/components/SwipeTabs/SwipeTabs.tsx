import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import type { Swiper as SwiperType } from "swiper"
import "./swiper.sass"

type SwipeTabsProps = {
  render: TabsT[]
}

export type TabsT = {
  title: string
  components: React.ReactNode
}

export const SwipeTabs = ({ render }: SwipeTabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    swiperRef.current?.slideTo(index)
  }

  return (
    <div className="swipercontainer">
      <div className="swipercontainer__tabs">
        {render.map((i, idx) => (
          <button
            key={idx}
            className="swipertabs"
            onClick={() => handleTabClick(idx)}
            style={{
              borderBottom:
                activeTab === idx
                  ? "1px solid #009e96"
                  : "1px solid transparent",
              color: activeTab === idx ? "#009e96" : "#adadad",
            }}
          >
            {i.title}
          </button>
        ))}
      </div>
      <Swiper
        className="swiperwrapper"
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={1}
        spaceBetween={20}
      >
        {render.map((i, index) => (
          <SwiperSlide key={index}>
            <div style={{ height: "100%" }}>{i.components}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
