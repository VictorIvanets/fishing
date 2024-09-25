import { CommentItem } from './type.comment'

function CommentItemComponent({ login, setId, comment, commId }: CommentItem) {
	console.log(login, setId, comment, commId)

	return (
		<div className="getcomments">
			<div className="getcomments__head">
				<button> Видалити </button>
				<h3>{login}:</h3>
			</div>

			<p>{comment}</p>
		</div>
	)
}

export default CommentItemComponent
