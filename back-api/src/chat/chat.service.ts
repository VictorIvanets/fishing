import { Injectable } from '@nestjs/common'
import { NewCommentInput } from './dto/new-comment.input'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { ChatDto } from './dto/chat.dto'
import { Chat } from './models/chat.model'

@Injectable()
export class ChatService {
	constructor(
		@InjectModel(Chat)
		private readonly chat: ModelType<Chat>,
	) {}
	async create(data: NewCommentInput): Promise<Chat> {
		const dto: ChatDto = {
			comId: (Math.random() * 100000).toFixed(),
			user: data.user,
			title: 'chat',
			comment: data.comment,
		}
		const newComment = new this.chat(dto)

		return newComment.save()
	}

	async findOneById(comId: string): Promise<Chat> {
		const commOne = await this.chat.findOne({ comId }).exec()
		console.log(commOne)
		if (!commOne) {
			throw new Error(`${comId} comment not found`)
		}
		return commOne
	}

	async findAll(title: string): Promise<Chat[]> {
		const commAll = await this.chat.find({ title }).exec()
		if (!commAll) {
			throw new Error(`error get all comment`)
		}

		const date = new Date()
		if (commAll.length > 100) {
			commAll.forEach(async (i) => {
				if (+date - +i.createdAt > 7200000) {
					const comId = i.comId
					await this.chat.findOneAndDelete({ comId }).exec()
				} else {
					return
				}
			})
		}
		return commAll
	}

	async remove(comId: string): Promise<boolean> {
		// const user = 'ADMIN'
		// await this.chat.deleteMany({ user }).exec()

		const del = await this.chat.findOneAndDelete({ comId }).exec()
		if (!del) {
			throw new Error(`${comId} comment not found`)
		} else {
			return true
		}
	}
}
