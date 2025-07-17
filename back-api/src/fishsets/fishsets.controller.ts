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
import { CommentService } from 'src/comment/comment.service'
import { GetPhotoService } from 'src/getPhoto/getPhoto.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('fishsets old')
@Controller('fishsets')
export class FishsetsController {
	constructor(
		private readonly fishService: FishsetsService,
		private readonly commentService: CommentService,
		private readonly getfotoService: GetPhotoService,
	) {}

	// @HttpCode(200)
	// @Post('sets')
	// async sets(@Body() dto: FishDto): Promise<unknown> {
	// 	return await this.fishService.createSets(dto)
	// }

	// @HttpCode(200)
	// @Get(':login')
	// async getSets(@Param('login') login: string): Promise<object> {
	// 	return await this.fishService.findUserSets(login)
	// }

	// @HttpCode(200)
	// @Get('all/:db')
	// async getAllSets(@Param('db') db: string): Promise<object> {
	// 	const res = await this.fishService.findAllSets(db)
	// 	const output = res.map((i) => {
	// 		const news = {
	// 			title: i.title,
	// 			description: i.description,
	// 			score: i.score,
	// 			coords: i.coords,
	// 			date: i.date,
	// 			setID: i.setID,
	// 			img: i.img,
	// 			weather: i.weather,
	// 		}
	// 		return news
	// 	})
	// 	return output
	// }

	// @HttpCode(200)
	// @Delete(':id')
	// async delSet(@Param('id') id: string): Promise<string> {
	// 	await this.getfotoService.delBySetId(id)
	// 	await this.commentService.delCommBySetId(id)
	// 	return await this.fishService.delById(id)
	// }

	// @HttpCode(200)
	// @Get('onesets/:id')
	// async getSetsById(@Param('id') id: string): Promise<object> {
	// 	return await this.fishService.getSetsById(id)
	// }
}
