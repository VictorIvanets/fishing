import { useCheckOut, useSubscribeForCheck } from './glq_hooks/chatUser.hook'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import {
	useDelComment,
	useQueryAllComment,
	useSubscribeForComment,
} from './glq_hooks/chatComment.hook'
import { memo, useCallback, useEffect, useState } from 'react'
import { CommentData } from './glq_hooks/chat.types'
import { UserComponent } from './components/userComponent'
import { CommentComponent } from './components/commentComponent'
import { useNavigate } from 'react-router-dom'

const ChatPage = memo(() => {
	const { login } = useSelector((s: RootState) => s.user)
	const { deletedCommentById } = useDelComment()
	const { loading, error, allComm } = useQueryAllComment()
	const { subdata } = useSubscribeForCheck()
	const { subdataComment } = useSubscribeForComment()
	const [allCommentData, setAllCommentData] = useState<CommentData[]>([])
	const navigate = useNavigate()
	const { userOutByUserId } = useCheckOut()
	const [selectUser, setSelectUser] = useState<string>('')

	const outChat = useCallback(
		(userId: string) => {
			navigate(-1)
			userOutByUserId(userId)
		},
		[navigate, userOutByUserId],
	)

	useEffect(() => {
		if (subdataComment) setAllCommentData(subdataComment)
		else {
			setAllCommentData(allComm)
		}
	}, [subdataComment, allComm])

	return (
		<div className="chatpage">
			<>
				<div className="chatpage__section">
					{login && (
						<UserComponent
							setSelectUser={setSelectUser}
							login={login}
							subdata={subdata}
							outChat={outChat}
						/>
					)}
					{login && (
						<CommentComponent
							selectUser={selectUser}
							login={login}
							allCommentData={allCommentData}
							loading={loading}
							error={error}
							deletedCommentById={deletedCommentById}
						/>
					)}
				</div>
			</>
		</div>
	)
})

export default ChatPage
