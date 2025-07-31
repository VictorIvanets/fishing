import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { FileElemResponseT } from './photo.types'
import * as sharp from 'sharp'
import { MFile } from './mfile.class'
import { FishingsModel } from 'src/fishings/fishings.model'

@Injectable()
export class PhotoService {
	constructor(
		@InjectModel(FishingsModel)
		private readonly fishingsModel: ModelType<FishingsModel>,
	) {}
	async savePhoto(
		files: MFile[],
		setid: string,
		imgId: string,
	): Promise<FileElemResponseT[]> {
		const res: FileElemResponseT[] = []
		for (const file of files) {
			const fishset = await this.fishingsModel.findOne({ _id: setid }).exec()
			const checkDouble = fishset.img.find(
				(i) => i.url === `${setid}/${file.originalname}`,
			)
			if (!checkDouble) {
				fishset.img.unshift({
					url: `${setid}/${file.originalname}`,
					imgId,
				})
			}

			const resultLoad = await this.fishingsModel
				.findByIdAndUpdate(fishset._id, fishset, { new: true })
				.exec()
			res.push({
				url: `${setid}/${file.originalname}`,
				name: file.originalname,
				_id: resultLoad._id.toString(),
			})
		}
		return res
	}

	convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer()
	}
}
