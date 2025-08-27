import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { PostsCommentsService } from './postComments.service'
import { DelByIdResponseT, PostCommentsModel } from './postComments.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { PostCommentsDto } from './postCommentsdto'
import { CurrentUser } from 'src/auth/auth.decorator'

@ApiTags('PostComment')
@UseGuards(AuthGuard('jwt'))
@Controller('postcomment')
export class PostsCommentsController {
	constructor(private readonly postsCommentService: PostsCommentsService) {}

	@HttpCode(200)
	@Post('create')
	async setComment(
		@Body() dto: PostCommentsDto,
		@CurrentUser() user: { _id: string; login: string },
	): Promise<PostCommentsModel> {
		return await this.postsCommentService.createComment(dto, user)
	}

	@HttpCode(200)
	@Get(':postId')
	async getComment(
		@Param('postId') postId: string,
	): Promise<PostCommentsModel[]> {
		const comments = await this.postsCommentService.getCommentBySetId(postId)
		return comments.reverse()
	}

	@HttpCode(200)
	@Delete(':id')
	async delComment(@Param('id') id: string): Promise<DelByIdResponseT> {
		return await this.postsCommentService.delCommById(id)
	}

	@HttpCode(200)
	@Delete('post/:postId')
	async delAllComment(
		@Param('setId') setId: string,
	): Promise<DelByIdResponseT> {
		return await this.postsCommentService.delCommBySetId(setId)
	}
}
