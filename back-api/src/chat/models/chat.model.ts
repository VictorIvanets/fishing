import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

export interface Chat extends Base {}
@ObjectType({ description: 'Chat' })
export class Chat extends TimeStamps {
	@prop({ unique: true })
	@Field((type) => ID)
	comId: string
	@prop()
	@Field({ nullable: false })
	title: string
	@prop()
	@Field({ nullable: true })
	comment?: string
	@prop()
	@Field({ nullable: false })
	user: string
	@prop()
	@Field()
	createdAt: Date
}
