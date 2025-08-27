import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PostCommentsDto {
	@ApiProperty({ example: 'mongo id' })
	@IsString()
	postId: string
	@ApiProperty({ example: 'some text' })
	@IsString()
	comment: string
}
