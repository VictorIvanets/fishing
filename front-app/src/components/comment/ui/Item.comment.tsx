import { CommentItemProps } from './type.comment'
import { delComments } from './fethComment'

function CommentItemComponent({
	login,
	comment,
	commId,
	setIsLoading,
}: CommentItemProps) {
	const userLogin = JSON.parse(localStorage.getItem('userName') || '')

	async function delComment(commId: number) {
		setIsLoading(false)
		await delComments(commId)
		setIsLoading(true)
	}

	return (
		<div className="getcomments">
			<div className="getcomments__head">
				{userLogin.login === login ? (
					<button onClick={() => delComment(commId)}> Видалити </button>
				) : (
					''
				)}
				<h3>{login}:</h3>
			</div>

			<p>{comment}</p>
		</div>
	)
}

export default CommentItemComponent
