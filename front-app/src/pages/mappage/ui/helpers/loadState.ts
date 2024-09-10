import axios, { AxiosError } from 'axios'
import { MapResponse } from '../../../../store/map.slice.types'
import { PREFIX } from '../../../../store/login.slice.types'

export async function fetchState(
	login: string,
): Promise<string | MapResponse[]> {
	try {
		const { data } = await axios.get<MapResponse[]>(
			`${PREFIX}fishsets/${login}`,
		)

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}

export async function fetchDelState(setId: string | number): Promise<string> {
	try {
		const { data } = await axios.delete<string>(`${PREFIX}fishsets/${setId}`)

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}
