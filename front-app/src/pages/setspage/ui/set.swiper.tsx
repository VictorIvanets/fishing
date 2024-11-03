import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { PREFIX_STATIC } from '../../../app/prefix'
import { useEffect, useState } from 'react'
import { loadFotoInFolder } from './getSetsById'
import { PreLoader } from '../../../widgets/PreLoader'

interface SwiperProps {
	img: string[]
	setId: number
}

export default function SwiperComponent({ img, setId }: SwiperProps) {
	const [fotoInFolder, setFotoInFolder] = useState<string[]>()

	useEffect(() => {
		const foto = loadFotoInFolder(`${setId}`)

		if (foto) {
			foto.then((res) =>
				setTimeout(() => {
					if (Array.isArray(res)) {
						setFotoInFolder(res.reverse())
					}
				}, 1000),
			)
		}
	}, [img, setFotoInFolder, setId])

	return (
		<div className="swiperpage">
			{fotoInFolder ? (
				<Swiper className="swiperbox" spaceBetween={50} slidesPerView={1}>
					{fotoInFolder ? (
						fotoInFolder.map((i) => {
							return (
								<SwiperSlide key={i} className="swiperpage__item">
									<div className="swiperpage__picbox">
										<img
											className="swiperpage__img"
											src={`${PREFIX_STATIC}static/${setId}/${i}`}
										/>
									</div>
								</SwiperSlide>
							)
						})
					) : (
						<SwiperSlide className="swiperpage__item">
							<div className="swiperpage__picbox">
								<img className="swiperpage__img" src="./fonsecond.jpg" />
							</div>
						</SwiperSlide>
					)}
				</Swiper>
			) : (
				<PreLoader />
			)}
		</div>
	)
}
