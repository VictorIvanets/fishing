import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { PostsModel } from './posts.model'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'

@Global()
@Module({
	controllers: [PostsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PostsModel,
				schemaOptions: {
					collection: 'posts',
				},
			},
		]),
		ConfigModule,
	],
	providers: [PostsService],
	exports: [PostsService],
})
export class PostsModule {}
