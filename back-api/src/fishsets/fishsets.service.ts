import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { FishModel } from './fishsets.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { FishDto } from './fishsets.dto'

@Injectable()
export class FishsetsService {
	constructor(
		@InjectModel(FishModel) private readonly fishModel: ModelType<FishModel>,
	) {}

	async createSets(dto: FishDto): Promise<FishModel> {
		const newSets = new this.fishModel({
			login: dto.login,
			title: dto.title,
			description: dto.description,
			score: dto.score,
			date: dto.date,
			coords: dto.coords,
			setID: dto.setID,
			db: 'database',
			img: [],
			weather: dto.weather,
			imgdb: [],
		})
		console.log(newSets)
		return newSets.save()
	}

	async findUserSets(login: string): Promise<FishModel[]> {
		return this.fishModel.find({ login }).exec()
	}

	async findAllSets(db: string): Promise<Omit<FishModel[], 'login'>> {
		console.log(db)
		const res = await this.fishModel.find({ db }).exec()
		console.log(res.length)
		return res
	}

	async delById(setID: string): Promise<string> {
		const res = this.fishModel.find({ setID }).exec()
		if (res) {
			this.fishModel.findOneAndDelete({ setID }).exec()
			return `delete`
		} else {
			return `error delete`
		}
	}

	async getSetsById(setID: string): Promise<FishModel> {
		return this.fishModel.findOne({ setID }).exec()
	}
}
