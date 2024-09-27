import axios, { AxiosError } from 'axios'
import { CommentItem } from './type.comment'
import { PREFIX } from '../../../app/prefix'

export async function setComments(
	commentItem: CommentItem,
): Promise<string | CommentItem> {
	const { login, setId, comment, commId } = commentItem
	try {
		const { data } = await axios.post<CommentItem>(`${PREFIX}comment/add`, {
			login,
			setId,
			comment,
			commId,
		})

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}

export async function getComments(
	setId: string,
): Promise<string | CommentItem[]> {
	try {
		const { data } = await axios.get<CommentItem[]>(`${PREFIX}comment/${setId}`)

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}

export async function delComments(commId: number): Promise<string> {
	try {
		const { data } = await axios.delete<string>(`${PREFIX}comment/${commId}`)

		return data
	} catch (e) {
		if (e instanceof AxiosError) {
			return e.message
		}
		return 'error'
	}
}
