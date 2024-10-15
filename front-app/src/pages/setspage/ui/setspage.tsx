import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSetsById } from './getSetsById'
import { MapResponse } from '../../../store/map.slice.types'
import axios from 'axios'
import SwiperComponent from './set.swiper'
import { PreLoader } from '../../../widgets/PreLoader'
import Weather from '../../../widgets/wather/ui/weather'
import { Comments } from '../../../components/comment'
import { PREFIX } from '../../../app/prefix'

function SetsPage() {
	const { id } = useParams()
	const [load, setload] = useState<MapResponse>()
	const [viewloadFoto, setviewloadFoto] = useState(false)
	const [files, setFiles] = useState<any>([])
	const [uploadedFiles, setUploadedFiles] = useState(false)
	const [nameFiles, setNameFiles] = useState('Вибрати фото')
	const { login } = JSON.parse(localStorage.getItem('userName') || '')

	useEffect(() => {
		const data = getSetsById(id)
		data.then((a) => {
			if (a && typeof a === 'object') {
				setload(a)
			}
			if (a && typeof a === 'string') {
				console.log(a)
			}
		})
	}, [id, uploadedFiles, files])

	function handleMultipleChange(event: any) {
		setFiles([...event.target.files])
		const nameFiale = [...event.target.files]

		nameFiale.forEach((file: any) => {
			const onefile = file.name
			const nameFile = onefile.split('.')

			setNameFiles(nameFile[0])
		})
	}
	async function handleMultipleSubmit(e: any) {
		e.preventDefault()
		const formData = new FormData()
		if (files) {
			files.forEach((file: any) => {
				formData.append('files', file, file.name)
			})
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			}

			axios
				.post(`${PREFIX}fotoset/upload/${load?.setID}`, formData, config)
				.then((response) => {
					setUploadedFiles(!uploadedFiles)
					console.log(response.data[0].name)
					setviewloadFoto(false)
				})
				.catch((error) => {
					console.error('Error uploading files: ', error)
				})
			setFiles([])
		}
	}

	return (
		<div className="setspagebox">
			<div className="setspage">
				{load ? (
					<div className="setspage__nav">
						<div className="colorLight setspage__loadinfo">
							<h2>
								Назва/Локація:
								<span>
									<h1>{load.title}</h1>
								</span>
							</h2>
							<div>
								<h3>Оцінка: {load.score}</h3>
								<h3>Дата рибалки: {load.date}</h3>
								{load.weather.length ? (
									<div className="setspage__weather">
										<Weather weather={load.weather} />
									</div>
								) : (
									''
								)}
								<br />
							</div>

							<a
								href={`https://www.google.com/maps?ll=${load.coords[0]},${load.coords[1]}&q=${load.coords[0]},${load.coords[1]}`}
								target="_blank"
							>
								<h2> Координати</h2>
								<p>latitude: {load.coords[0]}</p>
								<p>longitude: {load.coords[1]}</p>
							</a>
						</div>
						<div className="colorLight setspage__loadinfo__description">
							<div className="setspage__loadinfo__description__box">
								<div className="setspage__loadinfo__description__head">
									<h2>Опис:</h2>
								</div>
								<div className="setspage__loadinfo__description__text">
									<p>{load.description}</p>
								</div>
							</div>

							{login == load.login ? (
								<div className="loadimg">
									<h2
										className="loadimg__head"
										onClick={() => {
											setviewloadFoto(!viewloadFoto)
											setNameFiles('Вибрати фото')
										}}
									>
										{!viewloadFoto ? 'Завантажити фото' : 'приховати'}
									</h2>
									{viewloadFoto ? (
										<>
											<form
												onSubmit={handleMultipleSubmit}
												className="loadimg__form"
											>
												<label htmlFor="upload" className="loadimg__label">
													<p>{nameFiles}</p>
												</label>
												<input
													className="loadimg__input"
													name="upload"
													id="upload"
													type="file"
													multiple
													onChange={handleMultipleChange}
												/>
												<button className="loadimg__btn" type="submit">
													завантажити
												</button>
											</form>
											<button
												onClick={() => {
													setNameFiles('Вибрати фото')
													setFiles([])
												}}
												className="loadimg__btncansel"
											>
												відмінти
											</button>
										</>
									) : (
										''
									)}
								</div>
							) : (
								''
							)}
						</div>
					</div>
				) : (
					<h1>ERORR. NO DATA</h1>
				)}
				<div className="setspage__moreinfo colorLight">
					{load?.img ? (
						<SwiperComponent img={load?.img} setId={load?.setID} />
					) : (
						<PreLoader />
					)}
				</div>
			</div>
			<div className="comentbox">
				<Comments login={login} setId={id} />
			</div>
		</div>
	)
}

export default SetsPage
