import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { ConfigModule } from '@nestjs/config'

@Module({
	controllers: [CommentController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CommentModel,
				schemaOptions: {
					collection: 'comment',
				},
			},
		]),
		ConfigModule,
	],
	providers: [CommentService],
})
export class CommentModule {}
