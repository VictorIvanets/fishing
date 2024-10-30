import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { PREFIX_STATIC } from '../../../app/prefix'
import { useEffect, useState } from 'react'
import { PreLoader } from '../../../widgets/PreLoader'
import { DataForSwiper } from '../../galerypage/ui/galerypage'

interface AllSwiperProps {
	data: DataForSwiper[]
}

export default function SwiperAllComponent({ data }: AllSwiperProps) {
	const [fotoInFolder, setFotoInFolder] = useState<DataForSwiper[]>()

	useEffect(() => {
		setFotoInFolder(data)
	}, [data])

	return (
		<div className="swiperpage">
			<Swiper className="swiperbox" spaceBetween={50} slidesPerView={1}>
				{fotoInFolder ? (
					fotoInFolder.map((i) => {
						return (
							<SwiperSlide key={i.setID + i.img} className="swiperpage__item">
								<div className="swiperpage__picbox">
									<img
										className="swiperpage__img"
										src={`${PREFIX_STATIC}static/${i.setID}/${i.img}`}
									/>
								</div>
							</SwiperSlide>
						)
					})
				) : (
					<PreLoader />
				)}
			</Swiper>
		</div>
	)
}
