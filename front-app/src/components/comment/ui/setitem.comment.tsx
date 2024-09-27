import { FormEvent } from 'react'
import { CommentItem, CommentSubmit, SetCommentProps } from './type.comment'
import { setComments } from './fethComment'
import { PreLoaderGradient } from '../../../widgets/PreLoader'

function SetComment({
	login,
	setId,
	isLoading,
	setIsLoading,
}: SetCommentProps) {
	async function onSubmit(e: FormEvent) {
		setIsLoading(false)
		e.preventDefault()
		const target = e.target as typeof e.target & CommentSubmit
		const { comment } = target
		if (comment.value.length) {
			const outcomment: CommentItem = {
				login,
				setId,
				comment: comment.value,
				commId: +(Math.random() * 100000).toFixed() * 2,
			}
			await setComments(outcomment)
			comment.value = ''
		}
		setIsLoading(true)
	}

	return (
		<>
			<div className="setcomments">
				{isLoading ? (
					<form className="setcomments__form" onSubmit={onSubmit}>
						<label htmlFor="comment">
							<p className="roboto-medium">Ваш коментар:</p>
						</label>
						<textarea id="comment" name="comment" rows={5} cols={33}></textarea>
						<button>Відправити</button>
					</form>
				) : (
					<PreLoaderGradient />
				)}
			</div>
		</>
	)
}

export default SetComment
