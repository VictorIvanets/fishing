import { UserData } from '../glq_hooks/chat.types'

interface userComponentProps {
	login: string
	subdata: UserData[]
	outChat: (userId: string) => void
}

export function UserComponent(props: userComponentProps) {
	const { login, subdata, outChat } = props

	return (
		<div className="chatpage__userbox chatpage__itembox">
			{subdata &&
				subdata.map((i) => {
					if (i.user === login) {
						return (
							<button
								className="chatpage__outbtn"
								onClick={() => outChat(i.userId)}
							>
								ВИЙТИ
							</button>
						)
					}
				})}
			<h3 className="margin1">У ЧАТІ:</h3>
			<div className="chatpage__useritems">
				{subdata &&
					subdata.map((i) => {
						if (login === i.user) {
							return (
								<div key={i.userId} className="chatpage__myuser">
									<p>{i.user}</p>
								</div>
							)
						} else {
							return (
								<div key={i.userId} className="chatpage__user">
									<p>{i.user}</p>
								</div>
							)
						}
					})}
			</div>
		</div>
	)
}
