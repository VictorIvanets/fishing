import { FormEvent } from 'react'
import { useAddComment } from '../glq_hooks/chatComment.hook'
import { CommentSubmit } from '../glq_hooks/chat.types'
import { PreLoaderGradientBox } from '../../../../widgets/PreLoader'

interface AddCommentComponentProps {
	login: string
}

export function AddCommentComponent({ login }: AddCommentComponentProps) {
	const { addedComment, loadingAddComment, errorAddComment } = useAddComment()

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		const target = e.target as typeof e.target & CommentSubmit
		const { comment } = target
		if (comment.value.length) {
			addedComment(login, comment.value)
			comment.value = ''
		}
	}

	return (
		<form onSubmit={onSubmit} className="addcomment">
			{loadingAddComment ? (
				<PreLoaderGradientBox />
			) : errorAddComment ? (
				<h3>{errorAddComment.message}</h3>
			) : (
				<>
					<textarea
						className="addcomment__input"
						id="comment"
						name="comment"
						rows={5}
						cols={33}
					></textarea>
					<button className="addcomment__btn">SEND</button>
				</>
			)}
		</form>
	)
}
