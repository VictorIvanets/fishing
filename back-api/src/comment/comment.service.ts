import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { CommentModel, DelByIdResponseT } from './comment.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(CommentModel)
		private readonly commentModel: ModelType<CommentModel>,
	) {}

	async createComment(dto: CommentDto): Promise<CommentModel> {
		const newComment = new this.commentModel(dto)
		const res = await newComment.save()
		return res
	}

	async getCommentBySetId(setId: string): Promise<CommentModel[]> {
		return this.commentModel.find({ setId }).exec()
	}

	async delCommById(_id: string): Promise<DelByIdResponseT> {
		const res = await this.commentModel.deleteOne({ _id }).exec()
		if (res.deletedCount === 1) return { success: true, id: _id }
		return { success: false, message: 'Коментарія з таким ID не знайдено' }
	}

	async delCommBySetId(setId: string): Promise<string> {
		const result = await this.commentModel.find({ setId }).exec()
		result.forEach(async (i) => {
			await this.commentModel.deleteOne({ setId: i.setId }).exec()
		})
		return setId
	}
}
