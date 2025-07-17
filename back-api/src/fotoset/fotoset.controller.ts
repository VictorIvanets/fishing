import { FileInterceptor } from '@nestjs/platform-express'
import { FotosetService } from './fotoset.service'
import {
	Controller,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileElemResponse } from './fotoset.dto'
import { MFile } from './mfile.class'
import { GetPhotoService } from 'src/getPhoto/getPhoto.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Photoset')
@UseGuards(AuthGuard('jwt'))
@Controller('photoset')
export class PhotosetController {
	constructor(
		private readonly photosetService: FotosetService,
		private readonly getfotoService: GetPhotoService,
	) {}

	// @Post('upload/:folder')
	// @HttpCode(200)
	// @UseInterceptors(FileInterceptor('files'))
	// async uploadFoto(
	// 	@UploadedFile() file: Express.Multer.File,
	// 	@Param('folder') folder: string,
	// ): Promise<FileElemResponse[]> {
	// 	if (file) {
	// 		const saveArr: MFile[] = [new MFile(file)]
	// 		const img = await this.getfotoService.savePhotoBd(saveArr, folder)
	// 		return await this.photosetService.savePhoto(saveArr, folder)
	// 	}
	// }
}
