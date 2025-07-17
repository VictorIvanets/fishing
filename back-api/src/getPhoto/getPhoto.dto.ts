import { IsObject, IsString } from 'class-validator'
import { MFile } from 'src/fotoset/mfile.class'

export class GetPhotoDto {
	@IsString()
	setid: string
	@IsString()
	filename: string
	imgBuffer: Buffer
}

export class LoadPhotoDto {
	@IsObject()
	files: MFile[]
	@IsString()
	folder: string
}

export class GetPhotoElemResponse {
	setid: string
	filename: string
	imgBuffer: Buffer
}
