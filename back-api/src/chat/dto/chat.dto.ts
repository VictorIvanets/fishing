import { IsArray, IsDate, IsNumber, IsObject, IsString } from 'class-validator'

export class ChatDto {
	@IsNumber()
	comId: string
	@IsString()
	comment?: string
	@IsString()
	title: string
	@IsString()
	user: string
}
