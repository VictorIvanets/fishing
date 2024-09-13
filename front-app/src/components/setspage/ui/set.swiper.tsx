import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import { EffectCoverflow, Pagination } from 'swiper/modules'
import { PREFIX_STATIC } from '../../../store/login.slice.types'

interface SwiperProps {
	img: string[]
}

export default function SwiperComponent({ img }: SwiperProps) {
	return (
		<div className="swiperpage">
			<Swiper
				className="swiperbox"
				// spaceBetween={50}
				// slidesPerView={1}

				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={true}
				modules={[EffectCoverflow, Pagination]}
				// className="mySwiper"
			>
				{img
					? img.map((i) => {
							return (
								<SwiperSlide className="swiperpage__picbox">
									<img
										className="swiperpage__img"
										src={`${PREFIX_STATIC}static/${i}`}
									/>
								</SwiperSlide>
							)
					  })
					: ''}
			</Swiper>
		</div>
	)
}
