import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { genSaltSync, hashSync, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { AuthModel } from './auth.model'
import { AuthDto } from './auth.dto'
const USER_NOT_FOUND = 'Такого користувача не знайдено'
const PASS_NOT_CORRECT = 'Невірний пароль'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel) private readonly userModel: ModelType<AuthModel>,
		private readonly jwtService: JwtService,
	) {}
	async createUser(dto: AuthDto): Promise<unknown> {
		const salt = genSaltSync(10)
		const newUser = new this.userModel({
			login: dto.login,
			passwordHash: hashSync(dto.password, salt),
			name: dto.name,
			subname: dto.subname,
			country: dto.country,
			city: dto.city,
		})
		console.log(newUser)
		return newUser.save()
	}
	async findUser(login: string): Promise<AuthModel> {
		return this.userModel.findOne({ login }).exec()
	}

	async validateUser(
		login: string,
		password: string,
	): Promise<Pick<AuthModel, 'login'>> {
		const user = await this.findUser(login)
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND)
		}
		const isCorrectPass = await compare(password, user.passwordHash)
		if (!isCorrectPass) {
			throw new UnauthorizedException(PASS_NOT_CORRECT)
		}
		return { login: user.login }
	}

	async login(login: string): Promise<object> {
		const payload = { login }
		return {
			access_token: await this.jwtService.signAsync(payload),
			login: login,
		}
	}

	async findByLogin(login: string): Promise<AuthModel> {
		const user = await this.findUser(login)
		return user
	}
	async delByLogin(login: string): Promise<string> {
		const { _id } = await this.findUser(login)
		this.userModel.findByIdAndDelete(_id).exec()
		return `delete: ${login}`
	}
}
