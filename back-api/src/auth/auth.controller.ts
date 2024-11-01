import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { InjectModel } from 'nestjs-typegoose'
import { AuthDto } from './auth.dto'

const REGISTER_ERROR = 'такий user зараєстрован'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto): Promise<unknown> {
		const oldUser = await this.authService.findUser(dto.login)
		if (oldUser) {
			throw new BadRequestException(REGISTER_ERROR)
		}
		return this.authService.createUser(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(
		@Body() { login, password }: Pick<AuthDto, 'login' | 'password'>,
	): Promise<object> {
		const user = await this.authService.validateUser(login, password)
		return this.authService.login(user.login, user.userId)
	}

	@HttpCode(200)
	@Get(':login')
	async user(@Param('login') login: string): Promise<object> {
		console.log(login)
		const user = await this.authService.findByLogin(login)
		console.log(user)
		return user
	}
	@HttpCode(200)
	@Delete(':login')
	async deluser(@Param('login') login: string): Promise<string> {
		const user = await this.authService.delByLogin(login)
		return user
	}
}
