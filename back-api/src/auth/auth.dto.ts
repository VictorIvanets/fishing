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
	@IsString()
	country: string
	@IsString()
	city: string
}
