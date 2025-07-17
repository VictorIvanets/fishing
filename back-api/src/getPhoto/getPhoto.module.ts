import { Global, Module } from '@nestjs/common'
import { GetPhotoService } from './getPhoto.service'
import { GetfotoController } from './getPhoto.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { GetPhotoModel } from './getPhoto.model'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

@Global()
@Module({
	controllers: [GetfotoController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/upload`,
			serveRoot: '/static',
		}),
		TypegooseModule.forFeature([
			{
				typegooseClass: GetPhotoModel,
				schemaOptions: {
					collection: 'getfoto',
				},
			},
		]),
		ConfigModule,
	],
	providers: [GetPhotoService],
	exports: [GetPhotoService],
})
export class GetPhotoModule {}
