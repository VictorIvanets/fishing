import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { PostsCommentsService } from './postComments.service'
import { DelByIdResponseT, PostCommentsModel } from './postComments.model'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { PostCommentsDto } from './postCommentsdto'
import { CurrentUser } from 'src/auth/auth.decorator'
import { PostsService } from 'src/posts/posts.service'

@ApiTags('PostComment')
@UseGuards(AuthGuard('jwt'))
@Controller('postcomment')
export class PostsCommentsController {
	constructor(
		private readonly postsCommentService: PostsCommentsService,
		private readonly postsService: PostsService,
	) {}

	@HttpCode(200)
	@Post('create')
	async setComment(
		@Body() dto: PostCommentsDto,
		@CurrentUser() user: { _id: string; login: string },
	): Promise<PostCommentsModel> {
		await this.postsService.updateCommentPost(dto.postId, 1)
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
	@Delete('delete')
	async delComment(
		@Query('commentId') commentId: string,
		@Query('postId') postId: string,
	): Promise<DelByIdResponseT> {
		await this.postsService.updateCommentPost(postId, -1)
		return await this.postsCommentService.delCommById(commentId)
	}

	@HttpCode(200)
	@Delete('post/:postId')
	async delAllComment(
		@Param('setId') setId: string,
	): Promise<DelByIdResponseT> {
		return await this.postsCommentService.delCommBySetId(setId)
	}
}
