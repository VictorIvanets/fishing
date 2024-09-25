interface Weather {
	weather: object[]
}

function Weather({ weather }: Weather | any) {
	let wind
	if (weather) {
		const wd = weather[2].deg

		if ((wd >= 0 && wd <= 45) || (wd >= 320 && wd <= 360)) {
			wind = 'Північ.'
		}
		if (wd >= 46 && wd <= 130) {
			wind = 'Схід.'
		}
		if (wd >= 131 && wd <= 230) {
			wind = 'Півден.'
		}
		if (wd >= 231 && wd <= 319) {
			wind = 'Захід.'
		}
	}
	return (
		<>
			{weather ? (
				<div className="weather">
					<div className="weather__top">
						<p>Tемпература: {weather[0].temp} °C</p>
						<p>Тиск: {weather[0].grnd_level} hPa</p>
					</div>
					<div className="weather__top">
						<p> {weather[1].sky} </p>
						<p>
							Вітер: {wind} {weather[2].speed} м/с
						</p>
					</div>
				</div>
			) : (
				<h2>error</h2>
			)}
		</>
	)
}

export default Weather
