import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class FishDto {
	@IsNumber()
	setID: number
	@IsString()
	login: string
	@IsString()
	title: string
	@IsString()
	description: string
	@IsNumber()
	score: number
	@IsString()
	date: number
	@IsArray()
	@IsNumber()
	coords: number[]
	@IsString()
	db: string
	@IsString()
	@IsArray()
	img: string[]
}
