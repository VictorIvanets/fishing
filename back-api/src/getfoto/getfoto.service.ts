import { Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import { path } from 'app-root-path'
import { MFile } from 'src/fotoset/mfile.class'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { GetFotoModel } from './getfoto.model'
import * as sharp from 'sharp'

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

		const uploadFolder = `${path}/upload/${folder}`

		if (fotoBySetId.length) {
			await ensureDir(uploadFolder)
			fotoBySetId.forEach(async (fotoitem) => {
				const originalname = fotoitem.filename
				const buffer = fotoitem.imgBuffer
				res.push(originalname)
				await writeFile(`${uploadFolder}/${originalname}`, buffer)
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

	async saveFotoBd(files: MFile[], folder: string): Promise<string> {
		for (const file of files) {
			const minbuffer = await this.convertToJpegMin(file.buffer)
			const filename = file.originalname
			const fotoset = await this.getFotoModel.findOne({ filename }).exec()
			const check = fotoset?.setid === folder ? true : false
			const checkcheck = fotoset?.filename && check ? false : true
			if (checkcheck) {
				const res = new this.getFotoModel({
					setid: folder,
					filename: file.originalname,
					imgBuffer: minbuffer,
				})

				res.save()
			} else {
				return
			}
		}

		return folder
	}

	async getAllFotoBySetId(setid: string): Promise<GetFotoModel[]> {
		const fotoByset = await this.getFotoModel.find({ setid }).exec()
		return fotoByset
	}

	async delBySetId(setid: string): Promise<string> {
		const fotoByset = await this.getFotoModel.find({ setid }).exec()

		fotoByset.forEach((i) => {
			const _id = i._id
			this.getFotoModel.findByIdAndDelete({ _id }).exec()
			return i.filename
		})

		return `DEL ${setid}`
	}
}
