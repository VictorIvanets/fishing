import { Injectable, UseGuards } from '@nestjs/common'
import { ensureDir, readFile, writeFile } from 'fs-extra'
import { path } from 'app-root-path'
import { MFile } from 'src/fotoset/mfile.class'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { GetPhotoModel, PhotoResponseDBT } from './getPhoto.model'
import * as sharp from 'sharp'

@Injectable()
export class GetPhotoService {
	constructor(
		@InjectModel(GetPhotoModel)
		private readonly getPhotoModel: ModelType<GetPhotoModel>,
	) {}
	async getFoto(folder: string): Promise<string[]> {
		const setid = folder
		const fotoBySetId = await this.getPhotoModel.find({ setid }).exec()
		const res = []

		const uploadFolder = `${path}/upload/${folder}`

		if (fotoBySetId.length) {
			await ensureDir(uploadFolder)
			fotoBySetId.forEach(async (photoitem) => {
				const originalname = photoitem.filename
				const buffer = photoitem.imgBuffer
				res.push(originalname)
				// const check = await readFile(`${uploadFolder}/${originalname}`)
				// if (!check) {
				// 	await writeFile(`${uploadFolder}/${originalname}`, buffer)
				await writeFile(`${uploadFolder}/${originalname}`, buffer)
				// }
			})
			return res
		} else return res
	}

	convertToJpegMin(file: Buffer): Promise<Buffer> {
		const size = file.byteLength
		if (size <= 200000) {
			return sharp(file).jpeg().toBuffer()
		}
		if (size > 200000 && size <= 500000) {
			return sharp(file).jpeg({ quality: 75 }).toBuffer()
		}
		if (size > 500000 && size <= 2000000) {
			return sharp(file).resize(1000).jpeg({ quality: 75 }).toBuffer()
		}
		if (size > 2000000) {
			return sharp(file).resize(1500).jpeg({ quality: 75 }).toBuffer()
		}
	}

	async savePhotoBd(files: MFile[], folder: string): Promise<PhotoResponseDBT> {
		for (const file of files) {
			const minbuffer = await this.convertToJpegMin(file.buffer)
			const filename = file.originalname
			const fotoset = await this.getPhotoModel.findOne({ filename }).exec()
			const check = fotoset?.setid === folder ? true : false
			const checkcheck = fotoset?.filename && check ? false : true
			if (checkcheck) {
				const res = new this.getPhotoModel({
					setid: folder,
					filename: file.originalname,
					imgBuffer: minbuffer,
				})

				res.save()
				return res
			} else {
				return
			}
		}
	}

	async getAllPhotoBySetId(setid: string): Promise<GetPhotoModel[]> {
		const fotoByset = await this.getPhotoModel.find({ setid }).exec()

		return fotoByset
	}

	async delBySetId(setid: string): Promise<string> {
		const fotoByset = await this.getPhotoModel.find({ setid }).exec()

		fotoByset.forEach((i) => {
			this.getPhotoModel.findByIdAndDelete({ _id: setid }).exec()
		})

		return `DEL ${setid}`
	}

	async delBy_Id(id: string): Promise<PhotoResponseDBT> {
		return await this.getPhotoModel.findOneAndDelete({ _id: id }).exec()
	}
}
