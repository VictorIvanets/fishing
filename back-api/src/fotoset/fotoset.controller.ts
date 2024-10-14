import { FileInterceptor } from '@nestjs/platform-express'
import { FotosetService } from './fotoset.service'
import {
	Controller,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileElemResponse } from './fotoset.dto'
import { MFile } from './mfile.class'
import { GetfotoService } from 'src/getfoto/getfoto.service'

@Controller('fotoset')
export class FotosetController {
	constructor(
		private readonly fotosetService: FotosetService,
		private readonly getfotoService: GetfotoService,
	) {}

	@Post('upload/:folder')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFoto(
		@UploadedFile() file: Express.Multer.File,
		@Param('folder') folder: string,
	): Promise<FileElemResponse[]> {
		if (file) {
			const saveArr: MFile[] = [new MFile(file)]
			this.getfotoService.saveFotoBd(saveArr, folder)
			return this.fotosetService.saveFoto(saveArr, folder)
		}
	}
}
