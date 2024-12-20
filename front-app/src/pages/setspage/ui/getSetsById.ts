import axios, { AxiosError } from 'axios'
import { PREFIX } from '../../../app/prefix'

export async function getSetsById(setId: string | undefined): Promise<string> {
	try {
		const { data } = await axios.get<string>(
			`${PREFIX}fishsets/onesets/${setId}`,
		)
		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}

export async function loadFoto(
	setId: string | undefined,
	file: any,
	config: any,
): Promise<string> {
	try {
		const { data } = await axios.post<string>(
			`${PREFIX}fotoset/upload/${setId}`,
			file,
			config,
		)
		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}

export async function loadFotoInFolder(
	setId: string | undefined,
): Promise<string | string[]> {
	try {
		const { data } = await axios.get<string[]>(`${PREFIX}getfoto/get/${setId}`)

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}
