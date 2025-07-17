import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'
import { FishingsService } from './fishings.service'
import { FishingsDto } from './fishings.dto'
import { CommentService } from 'src/comment/comment.service'
import { GetPhotoService } from 'src/getPhoto/getPhoto.service'
import { FishingsModel, FishingsResponseDBT } from './fishings.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CurrentUser } from 'src/auth/auth.decorator'

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
		@CurrentUser() user: any,
	): Promise<FishingsModel> {
		console.log(user)
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
	@Get('user')
	async getFishing(@CurrentUser() user: any): Promise<FishingsModel[]> {
		return await this.fishingsService.findUserFishings(user)
	}

	@HttpCode(200)
	@Get('all')
	async getAllFishings(): Promise<Omit<FishingsModel[], 'login'>> {
		return await this.fishingsService.findAllFishing()
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
