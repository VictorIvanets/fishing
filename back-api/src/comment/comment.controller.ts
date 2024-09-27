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
import { CommentModel } from './comment.model'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@HttpCode(200)
	@Post('add')
	async setComment(@Body() dto: CommentDto): Promise<CommentModel> {
		return await this.commentService.createComment(dto)
	}

	@HttpCode(200)
	@Get(':setId')
	async getComment(@Param('setId') setId: string): Promise<CommentModel[]> {
		const comments = await this.commentService.getCommentBySetId(setId)
		return comments.reverse()
	}

	@HttpCode(200)
	@Delete(':id')
	async delComment(@Param('id') id: string): Promise<string> {
		return await this.commentService.delCommById(id)
	}

	@HttpCode(200)
	@Delete('set/:setId')
	async delAllComment(@Param('setId') setId: string): Promise<string> {
		return await this.commentService.delCommBySetId(setId)
	}
}
