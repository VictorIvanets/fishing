import { ApolloError } from '@apollo/client'
import { CommentData } from '../glq_hooks/chat.types'
import { useEffect, useRef } from 'react'
import { AddCommentComponent } from './addCommentComponent'
import { PreLoaderGradient } from '../../../../widgets/PreLoader'

interface CommentComponentProps {
	login: string
	allCommentData: CommentData[]
	loading: boolean
	error: ApolloError | undefined
	deletedCommentById: (comId: string) => void
}

export function CommentComponent({
	login,
	allCommentData,
	loading,
	error,
	deletedCommentById,
}: CommentComponentProps) {
	const ref1 = useRef(null)
	const ref2 = useRef(null)

	const scrollDown = (r1: any, r2: any) => {
		if (allCommentData && allCommentData.length > 3) {
			r2.current.scrollIntoView({
				behavior: 'smooth',
			})
		} else {
			r1.current.scrollIntoView()
		}
	}

	useEffect(() => {
		if (ref1 && ref2) {
			const r1 = ref1
			const r2 = ref2
			if (r1 && r2) {
				scrollDown(r1, r2)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allCommentData])

	return (
		<div className="chatpage__commentbox">
			<div className="chatpage__commentitembox ">
				<div ref={ref1}></div>
				{loading && <PreLoaderGradient />}
				{error && <p>{error.message}</p>}
				{allCommentData &&
					allCommentData.map((i) => {
						return (
							<div
								key={i.comId}
								className={
									login === i.user
										? 'chatpage__comment mycomment'
										: 'chatpage__comment'
								}
							>
								<div className="chatpage__comment__head">
									<h3 className="colorGreen">{i.user}</h3>
									<p>
										{new Date(i.createdAt).getDate()}.
										{new Date(i.createdAt).getMonth() + 1}.
										{new Date(i.createdAt).getFullYear()}
									</p>
									<p>
										{new Date(i.createdAt).getHours()}.
										{new Date(i.createdAt).getMinutes()}
									</p>

									{login === i.user ? (
										<button
											className="chatpage__comment__delbtn"
											onClick={() => deletedCommentById(i.comId)}
										>
											delete
										</button>
									) : (
										''
									)}
								</div>
								<div className="chatpage__comment__text">
									<h3 className="tajustify margin1left">{i.comment}</h3>
								</div>
							</div>
						)
					})}
				<div ref={ref2}></div>
			</div>
			<AddCommentComponent login={login} />
		</div>
	)
}
