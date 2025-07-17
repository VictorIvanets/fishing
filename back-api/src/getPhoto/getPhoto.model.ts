import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export interface GetPhotoModel extends Base {}
export class GetPhotoModel extends TimeStamps {
	@prop()
	setid: string
	@prop()
	filename: string
	@prop()
	imgBuffer: Buffer
}

export type PhotoResponseDBT = Omit<
	GetPhotoModel &
		Required<{
			_id: Types.ObjectId
		}>,
	'typegooseName'
>
