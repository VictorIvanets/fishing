import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface FotoModel extends Base {}
export class FotoModel extends TimeStamps {
	@prop()
	setID: number
	@prop({ type: () => [Number] })
	coords: number[]
}
