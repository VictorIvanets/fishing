import { Controller, Delete, Get, UseGuards } from '@nestjs/common'
import { GetPhotoService } from './getPhoto.service'
import { HttpCode, Param, Post } from '@nestjs/common'
import { GetPhotoModel } from './getPhoto.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Getfoto')
@UseGuards(AuthGuard('jwt'))
@Controller('getfoto')
export class GetfotoController {
	constructor(private readonly getfotoService: GetPhotoService) {}

	@Get('get/:folder')
	@HttpCode(200)
	async getFotoById(@Param('folder') folder: string): Promise<string[]> {
		return this.getfotoService.getFoto(folder)
	}

	@Get('getall/:folder')
	@HttpCode(200)
	async getAllFotoBySetId(
		@Param('folder') folder: string,
	): Promise<GetPhotoModel[]> {
		return this.getfotoService.getAllPhotoBySetId(folder)
	}

	@Delete('del/:folder')
	@HttpCode(200)
	async delBySetId(@Param('folder') folder: string): Promise<string> {
		return this.getfotoService.delBySetId(folder)
	}
}
