import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AuthDto {
	@ApiProperty({ example: 'login' })
	@IsString()
	login: string

	@ApiProperty({ example: 'password' })
	@IsString()
	password: string

	@ApiProperty({ example: 'name' })
	@IsString()
	name: string

	@ApiProperty({ example: 'subname' })
	@IsString()
	subname: string

	@ApiProperty({ example: 'country' })
	@IsString()
	country: string

	@ApiProperty({ example: 'city' })
	@IsString()
	city: string
}
export class loginDto {
	@ApiProperty({ example: 'admin' })
	@IsString()
	login: string
	@ApiProperty({ example: '5555' })
	@IsString()
	password: string
}
