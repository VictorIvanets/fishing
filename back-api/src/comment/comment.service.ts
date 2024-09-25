import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(CommentModel)
		private readonly commentModel: ModelType<CommentModel>,
	) {}

	async createComment(dto: CommentDto): Promise<CommentModel> {
		const newComment = new this.commentModel({
			login: dto.login,
			setId: dto.setId,
			db: 'comment',
			comment: dto.comment,
			commId: dto.commId,
		})
		console.log(newComment)
		return newComment.save()
	}

	async getCommentBySetId(setId: string): Promise<CommentModel[]> {
		return this.commentModel.find({ setId }).exec()
	}

	async delCommById(commId: string): Promise<string> {
		const res = this.commentModel.findOneAndDelete({ commId }).exec()
		return `delete ${commId}`
	}
}
