import { Global, Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { TypegooseModule } from 'nestjs-typegoose'
import { FishModel } from 'src/fishsets/fishsets.model'
import { ConfigModule } from '@nestjs/config'
import { PhotoController } from './photo.controller'
import { PhotoService } from './photo.service'
import { FishingsModel } from 'src/fishings/fishings.model'

@Global()
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/upload`,
			serveRoot: '/static',
		}),
		TypegooseModule.forFeature([
			{
				typegooseClass: FishingsModel,
				schemaOptions: {
					collection: 'fishings',
				},
			},
		]),
		ConfigModule,
	],
	providers: [PhotoService],
	controllers: [PhotoController],
})
export class PhotoModule {}
