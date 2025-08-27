import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export interface PostsModel extends Base {}
export class PostsModel extends TimeStamps {
	@prop()
	userLogin: string
	@prop()
	userId: Types.ObjectId
	@prop()
	description: string
	@prop()
	colorSchema: string
}

export type PostsResponseDBT = Omit<
	PostsModel &
		Required<{
			_id: Types.ObjectId
		}>,
	'typegooseName'
>

export type DelByIdResponseT = {
	success: boolean
	id?: string
	message?: string
}
