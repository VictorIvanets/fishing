import { useEffect, useState } from 'react'
import CommentItemComponent from './Item.comment'
import SetComment from './setitem.comment'
import { CommentItem, CommentsProps } from './type.comment'
import { getComments } from './fethComment'

function Comments({ login, setId }: CommentsProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [dataLoad, setDataLoad] = useState<CommentItem[] | string>()

	useEffect(() => {
		if (setId) {
			const comments = getComments(setId)
			comments.then((comments) => setDataLoad(comments))
		}
	}, [isLoading, setId])

	return (
		<div className="comments">
			<div className="comments__head">
				<h2>КОМЕНТАРІ</h2>
			</div>
			<div className="comments__itembox">
				{Array.isArray(dataLoad)
					? dataLoad.map((com) => (
							<CommentItemComponent
								key={com.commId}
								login={com.login}
								setId={com.setId}
								comment={com.comment}
								commId={com.commId}
								setIsLoading={setIsLoading}
								isLoading={isLoading}
							/>
					  ))
					: 'ERROR LOADING'}
			</div>
			<div className="comments__setitem">
				<SetComment
					login={login}
					setId={setId}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

export default Comments
