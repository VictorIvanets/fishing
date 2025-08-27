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
import { PostsService } from './posts.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/auth.decorator'
import { PostsDto } from './posts.dto'
import { DelByIdResponseT, PostsModel, PostsResponseDBT } from './posts.model'
import { PostsCommentsService } from 'src/postComments/postComments.service'

@ApiTags('Posts')
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
	constructor(
		private readonly postsService: PostsService,
		private readonly postsCommentService: PostsCommentsService,
	) {}

	@HttpCode(200)
	@Post('create')
	async create(
		@Body() dto: PostsDto,
		@CurrentUser() user: { _id: string; login: string },
	): Promise<PostsModel> {
		return await this.postsService.createPost(dto, user)
	}

	@HttpCode(200)
	@Get('user')
	async getUserPost(
		@CurrentUser() user: { _id: string },
		@Query('limit') limit = '10',
		@Query('cursor') cursor?: string,
		@Query('description') description?: string,
	): Promise<{ data: PostsModel[]; nextCursor: string | null }> {
		return await this.postsService.myPosts(user, +limit, cursor, description)
	}

	@HttpCode(200)
	@Get('all')
	async getAllPost(
		@Query('limit') limit = '10',
		@Query('cursor') cursor?: string,
		@Query('description') description?: string,
	): Promise<{ data: PostsModel[]; nextCursor: string | null }> {
		return await this.postsService.allPosts(+limit, cursor, description)
	}

	@HttpCode(200)
	@Delete(':id')
	async delSet(@Param('id') id: string): Promise<DelByIdResponseT> {
		await this.postsCommentService.delCommBySetId(id)
		return await this.postsService.delById(id)
	}

	@HttpCode(200)
	@Get('onepost/:id')
	async getPostById(@Param('id') id: string): Promise<PostsModel> {
		return await this.postsService.getPostById(id)
	}
}
