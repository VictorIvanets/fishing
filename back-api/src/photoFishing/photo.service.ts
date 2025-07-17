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
		folder: string,
		imgId: string,
	): Promise<FileElemResponseT[]> {
		const res: FileElemResponseT[] = []
		for (const file of files) {
			res.push({
				url: `${folder}/${file.originalname}`,
				name: file.originalname,
			})
			const fishset = await this.fishingsModel
				.findOne({ folderName: folder })
				.exec()
			const checkDouble = fishset.img.find(
				(i) => i.url === `${folder}/${file.originalname}`,
			)
			if (!checkDouble) {
				fishset.img.unshift({
					url: `${folder}/${file.originalname}`,
					imgId,
				})
			}

			this.fishingsModel
				.findByIdAndUpdate(fishset._id, fishset, { new: true })
				.exec()
		}
		return res
	}

	convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer()
	}
}
