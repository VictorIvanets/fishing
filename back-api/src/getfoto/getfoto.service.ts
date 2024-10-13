import { Global, Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import sharp from 'sharp'
import { FileElemResponse } from 'src/fotoset/fotoset.dto'
import { path } from 'app-root-path'
import { MFile } from 'src/fotoset/mfile.class'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { GetFotoModel } from './getfoto.model'
import { GetFotoElemResponse } from './getfoto.dto'

@Injectable()
export class GetfotoService {
	constructor(
		@InjectModel(GetFotoModel)
		private readonly getFotoModel: ModelType<GetFotoModel>,
	) {}
	async getFoto(folder: string): Promise<string[]> {
		const setid = folder
		const fotoBySetId = await this.getFotoModel.find({ setid }).exec()
		const res = []

		if (fotoBySetId.length) {
			fotoBySetId.forEach(async (fotoitem) => {
				const folder = fotoitem.setid
				const originalname = fotoitem.filename
				const buffer = fotoitem.imgBuffer
				res.push(originalname)
				const uploadFolder = `${path}/upload/${folder}`
				const buf = Buffer.from(buffer)
				await ensureDir(uploadFolder)
				await writeFile(`${uploadFolder}/${originalname}`, buf)
			})

			return res
		} else return res
	}

	async saveFotoBd(files: MFile[], folder: string): Promise<string> {
		for (const file of files) {
			const filename = file.originalname
			const fotoset = await this.getFotoModel.find({ filename }).exec()
			if (!fotoset.length) {
				const imgBuffer = file.buffer.toString('base64')
				const res = new this.getFotoModel({
					setid: folder,
					filename: file.originalname,
					imgBuffer: imgBuffer,
				})
				console.log('UPLOAD')
				res.save()
			} else return
		}
		return folder
	}

	async getAllFotoBySetId(setid: string): Promise<GetFotoModel[]> {
		const fotoByset = await this.getFotoModel.find({ setid }).exec()
		return fotoByset
	}

	async delBySetId(setid: string): Promise<string> {
		const fotoByset = await this.getFotoModel.find({ setid }).exec()

		const delFile = fotoByset.map((i) => {
			const _id = i._id
			console.log(`DELETE FOTO ${i.filename}`)
			this.getFotoModel.findByIdAndDelete({ _id }).exec()
			return i.filename
		})

		console.log(`DELETE FOTO`)
		console.log(delFile)
		// console.log(fotoByset)
		return `DEL ${setid}`
	}

	// convertToWebp(file: Buffer): Promise<Buffer> {
	// 	return sharp(file).webp().toBuffer()
	// }
}
