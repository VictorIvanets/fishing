import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export enum Sex {
	F = 'female',
	M = 'male',
}
export interface AuthModel extends Base {}
export class AuthModel extends TimeStamps {
	@prop({ unique: true })
	login: string
	@prop()
	passwordHash: string
	@prop()
	name: string
	@prop()
	subname: string
	@prop()
	country: string
	@prop()
	city: string
	@prop()
	userId: string
}
