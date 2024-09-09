import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface FishModel extends Base {}
export class FishModel extends TimeStamps {
	@prop({ unique: true })
	setID: number
	@prop()
	login: string
	@prop()
	title: string
	@prop()
	description: string
	@prop()
	score: number
	@prop()
	date: string
	@prop({ type: () => [Number] })
	coords: number[]
}
