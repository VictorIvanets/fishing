import CommentItemComponent from './Item.comment'
import SetComment from './setitem.comment'
import { CommentsProps } from './type.comment'

function Comments({ login, setId }: CommentsProps) {
	return (
		<div className="comments">
			<div className="comments__head">
				<h2>КОМЕНТАРІ</h2>
			</div>
			<div className="comments__itembox">
				<CommentItemComponent
					login={'loginLog'}
					setId={'44568'}
					comment={
						' Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quia aperiam modi cupiditate quas vel iusto pariatur. Nostrum sit vero aliquam qui unde et voluptatum ab autem nisi quis. Mollitia.'
					}
					commId={154}
				/>
			</div>
			<div className="comments__setitem">
				<SetComment login={login} setId={setId} />
			</div>
		</div>
	)
}

export default Comments
