import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { ImageT, WeatherT } from './fishings.dto'
import { ObjectId, Types } from 'mongoose'

export interface FishingsModel extends Base {}
export class FishingsModel extends TimeStamps {
	@prop()
	folderName: number
	@prop()
	userName: string
	@prop()
	userId: Types.ObjectId
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
	@prop()
	db: string
	@prop({ type: () => [Object] })
	img: ImageT[]
	@prop({ type: () => Object })
	weather: WeatherT
}

export type FishingsResponseDBT = Omit<
	FishingsModel &
		Required<{
			_id: Types.ObjectId
		}>,
	'typegooseName'
>

export type ResponseForMapT = {
	_id: string
	title: string
	coords: number[]
	score: number
	description: string
	userId: string
}
