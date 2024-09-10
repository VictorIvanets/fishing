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
		})
		console.log(newSets)
		return newSets.save()
	}

	async findUserSets(login: string): Promise<FishModel[]> {
		return this.fishModel.find({ login }).exec()
	}

	async findAllSets(db: string): Promise<Omit<FishModel[], 'login'>> {
		return this.fishModel.find({ db }).exec()
	}

	async delById(setID: string = `0`): Promise<string> {
		const res = this.fishModel.find({ setID }).exec()
		if (res) {
			this.fishModel.findOneAndDelete({ setID }).exec()
			return `delete`
		} else {
			return `error delete`
		}
	}
}
