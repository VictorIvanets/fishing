import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common'
import { FishingsService } from './fishings.service'
import { FishingsDto } from './fishings.dto'
import { CommentService } from 'src/comment/comment.service'
import { GetPhotoService } from 'src/getPhoto/getPhoto.service'
import {
	FishingsModel,
	FishingsResponseDBT,
	ResponseForMapT,
} from './fishings.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CurrentUser } from 'src/auth/auth.decorator'
import { DelPhotoByIdResponseT } from 'src/getPhoto/getPhoto.model'

@ApiTags('Fishings')
@UseGuards(AuthGuard('jwt'))
@Controller('fishings')
export class FishingsController {
	constructor(
		private readonly fishingsService: FishingsService,
		private readonly commentService: CommentService,
		private readonly getfotoService: GetPhotoService,
	) {}

	@HttpCode(200)
	@Post('create')
	async create(
		@Body() dto: FishingsDto,
		@CurrentUser() user: { _id: string; login: string },
	): Promise<FishingsModel> {
		return await this.fishingsService.createFishing(dto, user)
	}

	@HttpCode(200)
	@Post('update/:id')
	async update(
		@Body() dto: FishingsDto,
		@Param('id') id: string,
	): Promise<FishingsModel> {
		return await this.fishingsService.updateFishing(id, dto)
	}
	@HttpCode(200)
	@Post('deletephoto')
	async dletePhoto(
		@Body() dto: { photoId: string; setId: string },
	): Promise<DelPhotoByIdResponseT> {
		const deletedPhoto = await this.getfotoService.delPhotoById(dto.photoId)
		const updeteFishing = await this.fishingsService.deletePhotoInFishing(dto)
		if (deletedPhoto.success && updeteFishing) {
			return { success: true, id: dto.photoId }
		} else return { success: false, message: 'Фото з таким ID не знайдено' }
	}

	@HttpCode(200)
	@Get('user')
	async getFishing(
		@CurrentUser() user: any,
		@Query('limit') limit = '10',
		@Query('cursor') cursor?: string,
	): Promise<{ data: FishingsModel[]; nextCursor: string | null }> {
		return await this.fishingsService.findUserFishings(user, +limit, cursor)
	}

	@HttpCode(200)
	@Get('all')
	async getAllFishings(
		@Query('limit') limit = '10',
		@Query('cursor') cursor?: string,
	): Promise<{ data: FishingsModel[]; nextCursor: string | null }> {
		return await this.fishingsService.findAllFishing(+limit, cursor)
	}
	@HttpCode(200)
	@Get('allformap')
	async getAllFishingsForMap(): Promise<ResponseForMapT[]> {
		return await this.fishingsService.findAllFishingRorMap()
	}

	@HttpCode(200)
	@Delete(':id')
	async delSet(@Param('id') id: string): Promise<FishingsResponseDBT> {
		await this.getfotoService.delBySetId(id)
		await this.commentService.delCommBySetId(id)
		return await this.fishingsService.delById(id)
	}

	@HttpCode(200)
	@Get('onesets/:id')
	async getSetsById(@Param('id') id: string): Promise<object> {
		return await this.fishingsService.getFishingById(id)
	}
}
