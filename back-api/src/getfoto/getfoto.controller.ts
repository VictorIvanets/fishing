import { Controller, Delete, Get } from '@nestjs/common'
import { GetfotoService } from './getfoto.service'
import { HttpCode, Param, Post } from '@nestjs/common'
import { GetFotoModel } from './getfoto.model'

@Controller('getfoto')
export class GetfotoController {
	constructor(private readonly getfotoService: GetfotoService) {}

	@Get('get/:folder')
	@HttpCode(200)
	async getFotoById(@Param('folder') folder: string): Promise<string[]> {
		return this.getfotoService.getFoto(folder)
	}

	@Get('getall/:folder')
	@HttpCode(200)
	async getAllFotoBySetId(
		@Param('folder') folder: string,
	): Promise<GetFotoModel[]> {
		return this.getfotoService.getAllFotoBySetId(folder)
	}

	@Delete('del/:folder')
	@HttpCode(200)
	async delBySetId(@Param('folder') folder: string): Promise<string> {
		return this.getfotoService.delBySetId(folder)
	}
}
