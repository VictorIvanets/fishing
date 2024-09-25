import axios from 'axios'

export const getWeatherApi = async (
	lat: number,
	lon: number,
): Promise<object[] | string> => {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather`,
			{
				params: {
					lat: `${lat}`,
					lon: `${lon}`,
					appid: 'c37d5a8e792375836f2aa82ac92089f5',
					lang: 'ua',
					units: 'metric',
				},
			},
		)
		return [data.main, { sky: data.weather[0].description }, data.wind]
	} catch (e: any) {
		return `${e.response.data.cod}: ${e.response.data.message}`
	}
}
