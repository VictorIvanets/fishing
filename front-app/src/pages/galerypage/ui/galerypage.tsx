import { useDispatch, useSelector } from 'react-redux'
import { AppDispath, RootState } from '../../../store/store'
import { useEffect, useState } from 'react'
import { PreLoaderGradient } from '../../../widgets/PreLoader'
import { allSetSets } from '../../../store/allset.slice'
import SwiperAllComponent from '../../setspage/ui/setAll.swiper'
import { loadFotoInFolder } from '../../setspage/ui/getSetsById'

export interface DataForSwiper {
	img: string
	setID: string
}

export function GaleryPage() {
	const dispatch = useDispatch<AppDispath>()
	const { alldata } = useSelector((s: RootState) => s.allset)
	const [img, setImg] = useState<DataForSwiper[]>()

	useEffect(() => {
		dispatch(allSetSets())
	}, [dispatch])

	useEffect(() => {
		const allImg: string[] = []
		alldata.forEach((i) => {
			allImg.push(...i.img)
		})

		const allImgById: DataForSwiper[] = []
		allImg.forEach((i) => {
			const arr = i.split('/')
			loadFotoInFolder(`${arr[0]}`)
			const item: DataForSwiper = {
				img: arr[1],
				setID: arr[0],
			}
			allImgById.push(item)

			setTimeout(() => {
				setImg(allImgById)
			}, 2000)
		})
	}, [alldata])

	return (
		<div className="galerypage">
			{img ? <SwiperAllComponent data={img} /> : <PreLoaderGradient />}
		</div>
	)
}

export default GaleryPage
