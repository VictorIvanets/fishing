import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'

export class CommentDto {
	@IsString()
	login: string
	@IsString()
	useId: string
	@IsString()
	setId: string
	@IsString()
	comment: string
}
