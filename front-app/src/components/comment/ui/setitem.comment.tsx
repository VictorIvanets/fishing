import { FormEvent } from 'react'
import { CommentItem, CommentsProps, CommentSubmit } from './type.comment'

function SetComment({ login, setId }: CommentsProps) {
	function onSubmit(e: FormEvent) {
		e.preventDefault()
		const target = e.target as typeof e.target & CommentSubmit
		const { comment } = target

		const outcomment: CommentItem = {
			login,
			setId,
			comment: comment.value,
			commId: +(Math.random() * 100000).toFixed() * 2,
		}
		console.log(outcomment)
		comment.value = ''
	}

	return (
		<div className="setcomments">
			<form className="setcomments__form" onSubmit={onSubmit}>
				<label htmlFor="comment">
					<p className="roboto-medium">Ваш коментар:</p>
				</label>
				<textarea id="comment" name="comment" rows={5} cols={33}></textarea>
				<button>Відправити</button>
			</form>
		</div>
	)
}

export default SetComment
