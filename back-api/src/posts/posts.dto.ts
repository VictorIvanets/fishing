import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PostsDto {
	@ApiProperty({ example: 'Some text' })
	@IsString()
	description: number

	@ApiProperty({ example: 'Purple' })
	@IsString()
	colorSchema: string
}
