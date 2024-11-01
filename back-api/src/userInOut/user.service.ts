import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserDto } from './user.dto'
import { UserInput } from './user.input'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: ModelType<UserModel>,
	) {}
	async userIn(user: string, userId: string): Promise<UserModel> {
		const dto: UserDto = {
			userId: userId,
			chat: 'chat',
			user: user,
		}
		const newUser = new this.userModel(dto)

		return newUser.save()
	}

	async findAll(chat: string): Promise<UserModel[]> {
		const userAll = await this.userModel.find({ chat }).exec()
		if (!userAll) {
			throw new Error(`error get all comment`)
		}
		return userAll
	}
	async userOut(userId: string): Promise<boolean> {
		// const user = 'multik'
		// const del = await this.userModel.deleteMany({ user }).exec()
		const del = await this.userModel.findOneAndDelete({ userId }).exec()
		// if (!del) {
		// 	throw true
		// } else {
		// 	return true
		// }
		return true
	}
}
