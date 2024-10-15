import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { PREFIX_STATIC } from '../../../app/prefix'

interface SwiperProps {
	img: string[]
}

export default function SwiperComponent({ img }: SwiperProps) {
	return (
		<div className="swiperpage">
			<Swiper className="swiperbox" spaceBetween={50} slidesPerView={1}>
				{img
					? img.map((i) => {
							return (
								<SwiperSlide className="swiperpage__item">
									<div className="swiperpage__picbox">
										<img
											className="swiperpage__img"
											src={`${PREFIX_STATIC}static/${i}`}
										/>
									</div>
								</SwiperSlide>
							)
					  })
					: ''}
			</Swiper>
		</div>
	)
}
