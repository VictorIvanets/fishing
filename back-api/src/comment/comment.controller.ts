import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentDto } from './comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@HttpCode(200)
	@Post('add')
	async setComment(@Body() dto: CommentDto): Promise<unknown> {
		return await this.commentService.createComment(dto)
	}

	@HttpCode(200)
	@Get(':setId')
	async getComment(@Param('setId') setId: string): Promise<object> {
		return await this.commentService.getCommentBySetId(setId)
	}

	@HttpCode(200)
	@Delete(':id')
	async delComment(@Param('id') id: string): Promise<string> {
		return await this.commentService.delCommById(id)
	}
}
