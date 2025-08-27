import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface PostCommentsModel extends Base {}
export class PostCommentsModel extends TimeStamps {
	@prop()
	login: string
	@prop()
	useId: string
	@prop()
	postId: string
	@prop()
	comment: string
}

export type DelByIdResponseT = {
	success: boolean
	id?: string
	message?: string
}
