import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'
import { PaidFishingT } from './fishings.model'

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
		example: {
			deg: 'number',
			feels_like: 'number',
			grnd_level: 'number',
			gust: 'number',
			humidity: 'number',
			pressure: 'number',
			sea_level: 'number',
			sky: 'string',
			speed: 'number',
			temp: 'number',
			temp_max: 'number',
			temp_min: 'number',
		},
	})
	@IsObject()
	weather: WeatherT

	@ApiProperty({
		example: {
			title: 'string',
			price: 500,
			owner: 'Vasyl',
		},
	})
	@IsObject()
	paid?: PaidFishingT
}

export type ImageT = {
	url: string
	imgId: string
}

export type WeatherT = {
	deg: number
	feels_like: number
	grnd_level: number
	gust: number
	humidity: number
	pressure: number
	sea_level: number
	sky: string
	speed: number
	temp: number
	temp_max: number
	temp_min: number
}
