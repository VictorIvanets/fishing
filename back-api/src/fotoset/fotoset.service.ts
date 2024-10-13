import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileElemResponse } from './fotoset.dto'
import * as sharp from 'sharp'
import { MFile } from './mfile.class'
import { FishModel } from 'src/fishsets/fishsets.model'
import { GetFotoModel } from 'src/getfoto/getfoto.model'

@Injectable()
export class FotosetService {
	constructor(
		@InjectModel(FishModel) private readonly fishModel: ModelType<FishModel>,
	) {}
	async saveFoto(files: MFile[], folder: string): Promise<FileElemResponse[]> {
		const res: FileElemResponse[] = []
		for (const file of files) {
			res.push({
				url: `${folder}/${file.originalname}`,
				name: file.originalname,
			})

			const setID = folder
			const fishset = await this.fishModel.findOne({ setID }).exec()

			if (fishset) {
				const notDouble = await this.fishModel.findOne({ setID }).exec()
				const checkDouble = notDouble.img.includes(
					`${folder}/${file.originalname}`,
				)
				if (!checkDouble) {
					fishset.img.unshift(`${folder}/${file.originalname}`)
				}
			}

			this.fishModel
				.findByIdAndUpdate(fishset._id, fishset, { new: true })
				.exec()
		}
		return res
	}

	convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer()
	}
}
