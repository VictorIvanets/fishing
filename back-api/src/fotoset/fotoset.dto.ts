import { IsNumber } from 'class-validator'

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
