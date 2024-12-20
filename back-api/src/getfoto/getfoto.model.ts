import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface GetFotoModel extends Base {}
export class GetFotoModel extends TimeStamps {
	@prop()
	setid: string
	@prop()
	filename: string
	@prop()
	imgBuffer: Buffer
}
