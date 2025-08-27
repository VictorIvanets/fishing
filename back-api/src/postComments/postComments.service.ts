import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { DelByIdResponseT, PostCommentsModel } from './postComments.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { PostCommentsDto } from './postCommentsdto'

@Injectable()
export class PostsCommentsService {
	constructor(
		@InjectModel(PostCommentsModel)
		private readonly postCommentsModel: ModelType<PostCommentsModel>,
	) {}

	async createComment(
		dto: PostCommentsDto,
		user: { _id: string; login: string },
	): Promise<PostCommentsModel> {
		const newComment = new this.postCommentsModel({
			login: user.login,
			useId: user._id,
			postId: dto.postId,
			comment: dto.comment,
		})
		const res = await newComment.save()
		return res
	}

	async getCommentBySetId(postId: string): Promise<PostCommentsModel[]> {
		return this.postCommentsModel.find({ postId }).exec()
	}

	async delCommById(_id: string): Promise<DelByIdResponseT> {
		const res = await this.postCommentsModel.deleteOne({ _id }).exec()
		if (res.deletedCount === 1) return { success: true, id: _id }
		return { success: false, message: 'Коментарія з таким ID не знайдено' }
	}

	async delCommBySetId(postId: string): Promise<DelByIdResponseT> {
		const res = await this.postCommentsModel.deleteMany({ postId }).exec()
		return {
			success: res.deletedCount > 0,
			id: postId,
			message: `Видалено коментарів: ${res.deletedCount}`,
		}
	}
}
