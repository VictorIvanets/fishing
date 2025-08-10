import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import {
	FishingsModel,
	FishingsResponseDBT,
	ResponseForMapT,
} from './fishings.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { FishingsDto } from './fishings.dto'
import { DB_STRING, INVALID_ID } from 'src/STATIC/static'
import { Types } from 'mongoose'

@Injectable()
export class FishingsService {
	constructor(
		@InjectModel(FishingsModel)
		private readonly fishingsModel: ModelType<FishingsModel>,
	) {}

	async createFishing(
		dto: FishingsDto,
		user: { _id: string; login: string },
	): Promise<FishingsModel> {
		const newFishing = new this.fishingsModel({
			folderName: `${(Math.random() * 100000).toFixed()}`,
			userName: user.login,
			userId: user._id,
			title: dto.title,
			description: dto.description,
			score: dto.score,
			date: dto.date,
			coords: dto.coords,
			db: DB_STRING,
			img: [],
			weather: dto.weather,
			imgdb: [],
		})
		return await newFishing.save()
	}

	async updateFishing(id: string, dto: FishingsDto): Promise<FishingsModel> {
		try {
			return await this.fishingsModel
				.findByIdAndUpdate(id, dto, { new: true })
				.exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}
	async deletePhotoInFishing(dto: {
		photoId: string
		setId: string
	}): Promise<FishingsModel> {
		try {
			const oneFising = await this.fishingsModel
				.findOne({ _id: dto.setId })
				.exec()

			const newImg = oneFising.img.filter((i) => i.imgId !== dto.photoId)
			oneFising.img = newImg

			return await this.fishingsModel
				.findByIdAndUpdate(dto.setId, oneFising, { new: true })
				.exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}

	async findUserFishings(
		user: { _id: string },
		limit: number,
		cursor?: string,
		title?: string,
		description?: string,
	): Promise<{ data: FishingsModel[]; nextCursor: string | null }> {
		try {
			const filter: any = { userId: user._id }
			if (cursor) {
				filter._id = { $lt: new Types.ObjectId(cursor) }
			}

			if (title) {
				filter.title = { $regex: new RegExp(title, 'i') }
			}
			if (description) {
				filter.description = { $regex: new RegExp(description, 'i') }
			}

			const results = await this.fishingsModel
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

	async findAllFishing(
		limit: number,
		cursor?: string,
		title?: string,
		description?: string,
	): Promise<{ data: FishingsModel[]; nextCursor: string | null }> {
		try {
			const filter: any = {}
			if (cursor) {
				filter._id = { $lt: new Types.ObjectId(cursor) }
			}

			if (title) {
				filter.title = { $regex: new RegExp(title, 'i') }
			}

			if (description) {
				filter.description = { $regex: new RegExp(description, 'i') }
			}

			const results = await this.fishingsModel
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

	async findAllFishingRorMap(): Promise<ResponseForMapT[]> {
		try {
			const results = await this.fishingsModel.find().exec()
			const response: ResponseForMapT[] = results.map((i) => {
				return {
					_id: i._id.toString(),
					title: i.title,
					coords: i.coords,
					score: i.score,
					description: i.description,
					userId: i.userId.toString(),
				}
			})
			return response
		} catch (e) {
			throw new UnauthorizedException(e)
		}
	}

	async delById(id: string): Promise<FishingsResponseDBT> {
		try {
			return await this.fishingsModel.findOneAndDelete({ _id: id }).exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}

	async getFishingById(id: string): Promise<FishingsModel> {
		try {
			return await this.fishingsModel.findOne({ _id: id }).exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}
}
