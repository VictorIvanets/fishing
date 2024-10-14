import { IsObject, IsString } from 'class-validator'
import { MFile } from 'src/fotoset/mfile.class'

export class GetFotoDto {
	@IsString()
	setid: string
	@IsString()
	filename: string
	imgBuffer: Buffer
}

export class LoadFotoDto {
	@IsObject()
	files: MFile[]
	@IsString()
	folder: string
}

export class GetFotoElemResponse {
	setid: string
	filename: string
	imgBuffer: Buffer
}
