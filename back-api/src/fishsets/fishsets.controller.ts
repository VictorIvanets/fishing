import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common'
import { FishsetsService } from './fishsets.service'
import { FishDto } from './fishsets.dto'

const REGISTER_ERROR = 'такий user зараєстрован'

@Controller('fishsets')
export class FishsetsController {
	constructor(private readonly fishService: FishsetsService) {}

	@HttpCode(200)
	@Post('sets')
	async sets(@Body() dto: FishDto): Promise<unknown> {
		return await this.fishService.createSets(dto)
	}

	@HttpCode(200)
	@Get(':login')
	async getSets(@Param('login') login: string): Promise<object> {
		const sets = await this.fishService.findUserSets(login)
		return sets
	}
	@HttpCode(200)
	@Delete(':id')
	async delSet(@Param('id') id: string): Promise<string> {
		const set = await this.fishService.delById(id)
		return set
	}
}
