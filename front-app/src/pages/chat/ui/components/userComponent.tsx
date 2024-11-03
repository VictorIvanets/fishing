import { useSelector } from 'react-redux'
import { UserData } from '../glq_hooks/chat.types'
import { RootState } from '../../../../store/store'
import { memo } from 'react'
import iconfishpage_chatout from '/iconfishpage_chatout.svg'

interface userComponentProps {
	login: string
	subdata: UserData[]
	outChat: (userId: string) => void
	setSelectUser: (user: string) => void
}

export const UserComponent = memo((props: userComponentProps) => {
	const { login, subdata, outChat, setSelectUser } = props
	const { userId } = useSelector((s: RootState) => s.user)

	return (
		<div className="chatpageuser">
			<div className="chatpage__userbox chatpage__itembox">
				<button
					className="chatpage__outbtn"
					onClick={() => outChat(userId ? userId : '')}
				>
					<div className="chatpage__outbtn__btn__svgbox">
						<img
							title="ВИДАЛИТИ"
							src={iconfishpage_chatout}
							className="chatpage__outbtn__btn__svgbox__img"
							alt="ВИДАЛИТИ"
						/>
					</div>
				</button>

				<h3 className="margin1">У ЧАТІ:</h3>
				<div className="chatpage__useritems">
					{subdata &&
						subdata.map((i) => {
							if (login === i.user) {
								return (
									<div
										onClick={() => {
											setSelectUser(i.user)
										}}
										key={i.userId}
										className="chatpage__myuser"
									>
										<p>{i.user}</p>
									</div>
								)
							} else {
								return (
									<div
										onClick={() => {
											setSelectUser(i.user)
										}}
										key={i.userId}
										className="chatpage__user"
									>
										<p>{i.user}</p>
									</div>
								)
							}
						})}
				</div>
			</div>
		</div>
	)
})
