import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
	@prop({ unique: true })
	commId: number
	@prop()
	login: string
	@prop()
	setId: string
	@prop()
	comment: string
	@prop()
	db: string
}
