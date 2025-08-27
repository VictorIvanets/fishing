import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { DelByIdResponseT, PostsModel, PostsResponseDBT } from './posts.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { PostsDto } from './posts.dto'
import { INVALID_ID } from 'src/STATIC/static'
import { Types } from 'mongoose'

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(PostsModel)
		private readonly postsModel: ModelType<PostsModel>,
	) {}

	async createPost(
		dto: PostsDto,
		user: { _id: string; login: string },
	): Promise<PostsModel> {
		const newPost = new this.postsModel({
			userLogin: user.login,
			userId: user._id,
			description: dto.description,
			colorSchema: dto.colorSchema,
		})
		return await newPost.save()
	}

	async myPosts(
		user: { _id: string },
		limit: number,
		cursor?: string,
		description?: string,
	): Promise<{ data: PostsModel[]; nextCursor: string | null }> {
		try {
			const filter: any = { userId: user._id }
			if (cursor) {
				filter._id = { $lt: new Types.ObjectId(cursor) }
			}

			if (description) {
				filter.description = { $regex: new RegExp(description, 'i') }
			}

			const results = await this.postsModel
				.find(filter)
				.sort({ _id: -1 })
				.limit(limit + 1)
				.exec()

			const hasNextPage = results.length > limit
			const data = hasNextPage ? results.slice(0, -1) : results
			const nextCursor = hasNextPage
				? data[data.length - 1]._id.toString()
				: null

			return { data, nextCursor }
		} catch (e) {
			throw new UnauthorizedException(e)
		}
	}

	async allPosts(
		limit: number,
		cursor?: string,
		description?: string,
	): Promise<{ data: PostsModel[]; nextCursor: string | null }> {
		try {
			const filter: any = {}
			if (cursor) {
				filter._id = { $lt: new Types.ObjectId(cursor) }
			}

			if (description) {
				filter.description = { $regex: new RegExp(description, 'i') }
			}

			const results = await this.postsModel
				.find(filter)
				.sort({ _id: -1 })
				.limit(limit + 1)
				.exec()

			const hasNextPage = results.length > limit
			const data = hasNextPage ? results.slice(0, -1) : results
			const nextCursor = hasNextPage
				? data[data.length - 1]._id.toString()
				: null

			return { data, nextCursor }
		} catch (e) {
			throw new UnauthorizedException(e)
		}
	}

	async delById(id: string): Promise<DelByIdResponseT> {
		const res = await this.postsModel.deleteOne({ _id: id }).exec()
		if (res.deletedCount === 1) return { success: true, id }
		return { success: false, message: 'Коментарія з таким ID не знайдено' }
	}

	async getPostById(id: string): Promise<PostsModel> {
		try {
			return await this.postsModel.findOne({ _id: id }).exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}
}
