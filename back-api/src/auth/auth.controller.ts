import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, loginDto } from './auth.dto'
import { AuthResponseT } from './auth.types'
import { AuthModel } from './auth.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from './auth.decorator'

const REGISTER_ERROR = 'такий user зараєстрован'

@ApiTags('Auth')
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
	async login(@Body() { login, password }: loginDto): Promise<AuthResponseT> {
		const user = await this.authService.validateUser(login, password)
		const res = await this.authService.login(user.login, user._id)

		return res
	}

	@HttpCode(200)
	@Get('check')
	async checkServer(): Promise<string> {
		return 'Server is running'
	}

	@UseGuards(AuthGuard('jwt'))
	@HttpCode(200)
	@Get('userinfo')
	async user(@CurrentUser() user: any): Promise<object> {
		return await this.authService.findUserById(user)
	}

	@UseGuards(AuthGuard('jwt'))
	@HttpCode(200)
	@Delete('delete/:id')
	async deluser(@Param('id') id: string): Promise<AuthModel> {
		const user = await this.authService.delUserById(id)
		return user
	}
}
