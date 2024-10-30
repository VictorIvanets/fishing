import { Global, Module } from '@nestjs/common'
import { GetfotoService } from './getfoto.service'
import { GetfotoController } from './getfoto.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { GetFotoModel } from './getfoto.model'
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
				typegooseClass: GetFotoModel,
				schemaOptions: {
					collection: 'getfoto',
				},
			},
		]),
		ConfigModule,
	],
	providers: [GetfotoService],
	exports: [GetfotoService],
})
export class GetfotoModule {}
