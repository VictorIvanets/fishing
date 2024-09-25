import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'

export class CommentDto {
	@IsNumber()
	setId: string
	@IsString()
	login: string
	@IsString()
	comment: string
	@IsNumber()
	commId: number
	@IsString()
	db: string
}
