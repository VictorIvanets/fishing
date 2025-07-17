import { FileInterceptor } from '@nestjs/platform-express'
import {
	Controller,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileElemResponseT } from './photo.types'
import { MFile } from './mfile.class'
import { GetPhotoService } from 'src/getPhoto/getPhoto.service'
import { PhotoService } from './photo.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Photo')
@UseGuards(AuthGuard('jwt'))
@Controller('photo')
export class PhotoController {
	constructor(
		private readonly photoService: PhotoService,
		private readonly getfotoService: GetPhotoService,
	) {}

	@Post('upload/:folder')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadPhoto(
		@UploadedFile() file: Express.Multer.File,
		@Param('folder') folder: string,
	): Promise<FileElemResponseT[]> {
		if (file) {
			const saveArr: MFile[] = [new MFile(file)]
			const img = await this.getfotoService.savePhotoBd(saveArr, folder)

			return await this.photoService.savePhoto(
				saveArr,
				folder,
				img._id.toString(),
			)
		}
	}
}
