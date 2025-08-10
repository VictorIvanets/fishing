import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { genSaltSync, hashSync, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { AuthModel } from './auth.model'
import { AuthDto } from './auth.dto'
import { ConfigService } from '@nestjs/config'
import { AuthResponseT, RegisterResponseT } from './auth.types'
import { Types } from 'mongoose'
import { PASS_NOT_CORRECT, USER_NOT_FOUND } from 'src/STATIC/static'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}
	async createUser(dto: AuthDto): Promise<RegisterResponseT> {
		const salt = genSaltSync(10)
		const newUser = new this.authModel({
			login: dto.login,
			passwordHash: hashSync(dto.password, salt),
			name: dto.name,
			subname: dto.subname,
			country: dto.country,
			city: dto.city,
		})
		return newUser.save()
	}
	async findUser(login: string): Promise<AuthModel> {
		return this.authModel.findOne({ login }).exec()
	}

	async findUserById(user: { _id: string; login: string }): Promise<AuthModel> {
		return this.authModel.findOne({ _id: user._id }).exec()
	}

	async validateUser(
		login: string,
		password: string,
	): Promise<Pick<AuthModel, 'login'> & Record<'_id', Types.ObjectId>> {
		try {
			const user = await this.authModel.findOne({ login })
			if (!user) {
				throw new UnauthorizedException(USER_NOT_FOUND)
			}
			const isCorrectPass = await compare(password, user.passwordHash)
			if (!isCorrectPass) {
				throw new UnauthorizedException(PASS_NOT_CORRECT)
			}
			return { login: user.login, _id: user._id }
		} catch (e) {
			throw new UnauthorizedException(e)
		}
	}

	async login(login: string, _id: Types.ObjectId): Promise<AuthResponseT> {
		const secret = this.configService.get('JWT_SECRET')
		return {
			access_token: await this.jwtService.signAsync({ login, _id }, { secret }),
			login: login,
			_id,
		}
	}

	async delUserById(id: string): Promise<AuthModel> {
		return await this.authModel.findByIdAndDelete({ _id: id }).exec()
	}
}
