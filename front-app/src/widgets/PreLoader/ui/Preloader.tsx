import { useState } from 'react'

export function PreLoader() {
	return (
		<div className="preloaderbox">
			<div className="preloader"></div>
		</div>
	)
}

export function PreLoaderAPI() {
	const [viewError, setviewError] = useState(false)

	setTimeout(() => {
		setviewError(true)
	}, 2000)

	return (
		<div className="preloaderbox_api">
			<div className="preloader_api">
				{viewError ? (
					<h3 className="white">
						Зачекайте <br /> можливо сервер ще не активний
					</h3>
				) : (
					''
				)}
			</div>
		</div>
	)
}
