import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
	@prop()
	login: string
	@prop()
	useId: string
	@prop()
	setId: string
	@prop()
	comment: string
}

export type DelByIdResponseT = {
	success: boolean
	id?: string
	message?: string
}
