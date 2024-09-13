import { FileInterceptor } from '@nestjs/platform-express'
import { FotosetService } from './fotoset.service'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileElemResponse } from './fotoset.dto'
import { MFile } from './mfile.class'

@Controller('fotoset')
export class FotosetController {
	constructor(private readonly fotosetService: FotosetService) {}

	@Post('upload/:folder')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFoto(
		@UploadedFile() file: Express.Multer.File,
		@Param('folder') folder: string,
	): Promise<FileElemResponse[]> {
		console.log('upload', file)
		const saveArr: MFile[] = []
		// const saveArr: MFile[] = [new MFile(file)]
		if (file.mimetype.includes('image')) {
			const buffer = await this.fotosetService.convertToWebp(file.buffer)
			saveArr.push(
				new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer,
				}),
			)
		}
		return this.fotosetService.saveFoto(saveArr, folder)
	}
}
