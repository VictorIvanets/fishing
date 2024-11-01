import {
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useAddComment } from '../glq_hooks/chatComment.hook'
import { CommentSubmit } from '../glq_hooks/chat.types'
import { PreLoaderGradientBox } from '../../../../widgets/PreLoader'

interface AddCommentComponentProps {
	login: string
	selectUser: string
}

export const AddCommentComponent = memo(
	({ login, selectUser }: AddCommentComponentProps) => {
		const { addedComment, loadingAddComment, errorAddComment } = useAddComment()
		const [value, setValue] = useState<string>('')
		const [valueSelectUser, setValueSelectUser] = useState<string>('')
		const inputRef = useRef<any>(null)

		useEffect(() => {
			setValueSelectUser(
				selectUser ? `${selectUser.toLocaleUpperCase()}> ` : '',
			)
		}, [selectUser])

		const onSubmit = useCallback(
			async (e: FormEvent) => {
				e.preventDefault()
				const target = e.target as typeof e.target & CommentSubmit
				const { comment } = target
				if (comment.value.length) {
					addedComment(login, comment.value)
					comment.value = ''
					setValue('')
					setValueSelectUser('')
				}
			},
			[addedComment, login],
		)

		const onChange = useCallback((val: string) => {
			setValue(val)
		}, [])

		useEffect(() => {
			inputRef.current.focus()
		}, [selectUser])

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
							value={value ? value : valueSelectUser}
							onChange={(e) => onChange(e.target.value)}
							ref={inputRef}
						></textarea>
						<button className="addcomment__btn">SEND</button>
					</>
				)}
			</form>
		)
	},
)
