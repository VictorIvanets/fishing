import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'

export class FishingsDto {
	@ApiProperty({ example: 'cool fising' })
	@IsString()
	title: string

	@ApiProperty({ example: 'wery good! cool fising' })
	@IsString()
	description: string

	@ApiProperty({ example: 7 })
	@IsNumber()
	score: number

	@ApiProperty({ example: '2024-12-05' })
	@IsString()
	date: string

	@ApiProperty({
		example: [50.235776468143186, 28.60992981120944],
	})
	@IsArray()
	@IsNumber()
	coords: number[]

	@ApiProperty({
		example: [],
	})
	@IsString()
	@IsArray()
	img: ImageT[]

	@ApiProperty({
		example: [],
	})
	@IsObject()
	@IsArray()
	weather: object[]
}

export type ImageT = {
	url: string
	imgId: string
}
