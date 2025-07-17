import { Types } from 'mongoose'
import { AuthModel } from './auth.model'

export type AuthResponseT = {
	access_token: string
	login: string
	_id: Types.ObjectId
}

export type RegisterResponseT = Omit<
	AuthModel &
		Required<{
			_id: Types.ObjectId
		}>,
	'typegooseName'
>
