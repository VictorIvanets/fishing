import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class FotoDto {
	@IsNumber()
	setID: number
	@IsNumber()
	foto: number[]
}

export class FileElemResponse {
	url: string
	name: string
}
