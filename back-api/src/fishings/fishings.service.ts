import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { FishingsModel, FishingsResponseDBT } from './fishings.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { FishingsDto } from './fishings.dto'
import { DB_STRING, INVALID_ID } from 'src/STATIC/static'

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

	async findUserFishings(user: { _id: string }): Promise<FishingsModel[]> {
		try {
			return await this.fishingsModel.find({ userId: user._id }).exec()
		} catch (e) {
			throw new UnauthorizedException(INVALID_ID, e)
		}
	}

	async findAllFishing(): Promise<Omit<FishingsModel[], 'login'>> {
		return await this.fishingsModel.find({ db: DB_STRING }).exec()
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
