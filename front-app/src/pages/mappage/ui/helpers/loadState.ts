import axios, { AxiosError } from 'axios'
import { PREFIX } from '../../../../app/prefix'

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
