import { Injectable, UseGuards } from '@nestjs/common'
import { ensureDir, readFile, writeFile, remove } from 'fs-extra'
import { path } from 'app-root-path'
import { MFile } from 'src/fotoset/mfile.class'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import {
	DelPhotoByIdResponseT,
	GetPhotoModel,
	PhotoResponseDBT,
	ResponseGetPhoto,
} from './getPhoto.model'
import * as sharp from 'sharp'

@Injectable()
export class GetPhotoService {
	constructor(
		@InjectModel(GetPhotoModel)
		private readonly getPhotoModel: ModelType<GetPhotoModel>,
	) {}
	async getFoto(folder: string): Promise<ResponseGetPhoto[]> {
		const fotoBySetId = await this.getPhotoModel.find({ setid: folder }).exec()
		const res: ResponseGetPhoto[] = []

		const uploadFolder = `${path}/upload/${folder}`

		if (fotoBySetId.length) {
			await ensureDir(uploadFolder)
			fotoBySetId.forEach(async (photoitem) => {
				const originalname = photoitem.filename
				const buffer = photoitem.imgBuffer
				res.push({ originalname, _id: photoitem._id.toString() })

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

	async savePhotoBd(files: MFile[], folder: string): Promise<PhotoResponseDBT> {
		for (const file of files) {
			const minbuffer = await this.convertToJpegMin(file.buffer)
			const filename = file.originalname
			const fotoset = await this.getPhotoModel.find({ setid: folder }).exec()

			const exist = fotoset.filter((i) => i.filename === filename)

			if (!exist.length) {
				const res = new this.getPhotoModel({
					setid: folder,
					filename: file.originalname,
					imgBuffer: minbuffer,
				})
				res.save()

				return res
			} else {
				return null
			}
		}
	}

	async getAllPhotoBySetId(setid: string): Promise<GetPhotoModel[]> {
		const fotoByset = await this.getPhotoModel.find({ setid }).exec()

		return fotoByset
	}

	async delBySetId(setid: string): Promise<string> {
		try {
			const fotoByset = await this.getPhotoModel.find({ setid }).exec()

			const filePath = `${path}/upload/${setid}`
			await remove(filePath)
			await ensureDir(`${path}/upload`)

			fotoByset.forEach(async (i) => {
				await this.getPhotoModel.findByIdAndDelete({ _id: setid }).exec()
			})

			return `DEL ${setid}`
		} catch (e) {
			console.log(e)
		}
	}

	async delPhotoById(_id: string): Promise<DelPhotoByIdResponseT> {
		const getPhoto = await this.getPhotoModel.findOne({ _id })
		try {
			const filePath = `${path}/upload/${getPhoto.setid}/${getPhoto.filename}`
			await remove(filePath)
		} catch (e) {
			console.log(e)
		}
		const fotoByset = await this.getPhotoModel.deleteOne({ _id }).exec()
		if (fotoByset.deletedCount === 1) return { success: true, id: _id }
		return { success: false, message: 'Фото з таким ID не знайдено' }
	}

	async delBy_Id(id: string): Promise<PhotoResponseDBT> {
		return await this.getPhotoModel.findOneAndDelete({ _id: id }).exec()
	}
}
