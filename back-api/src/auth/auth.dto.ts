import { IsNumber, IsString } from 'class-validator'

export class AuthDto {
	@IsString()
	login: string
	@IsString()
	password: string
	@IsString()
	name: string
	@IsString()
	subname: string
	@IsNumber()
	age: number
	@IsString()
	sex: string
	@IsString()
	country: string
	@IsString()
	city: string
	@IsString()
	img?: string
}
