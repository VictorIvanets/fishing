import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { PostCommentsModel } from './postComments.model'
import { PostsCommentsController } from './postCommentscontroller'
import { PostsCommentsService } from './postComments.service'

@Global()
@Module({
	controllers: [PostsCommentsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostCommentsModel,
				schemaOptions: {
					collection: 'postcomments',
				},
			},
		]),
		ConfigModule,
	],
	providers: [PostsCommentsService],
	exports: [PostsCommentsService],
})
export class PostsCommentsModule {}
