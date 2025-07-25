import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { ImageT } from './fishings.dto'
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
	@prop({ type: () => [String] })
	img: ImageT[]
	@prop({ type: () => [Object] })
	weather: object[]
}

export type FishingsResponseDBT = Omit<
	FishingsModel &
		Required<{
			_id: Types.ObjectId
		}>,
	'typegooseName'
>
