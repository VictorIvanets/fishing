import { Global, Module } from '@nestjs/common'
import { FotosetService } from './fotoset.service'
import { PhotosetController } from './fotoset.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { TypegooseModule } from 'nestjs-typegoose'
import { FishModel } from 'src/fishsets/fishsets.model'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/upload`,
			serveRoot: '/static',
		}),
		TypegooseModule.forFeature([
			{
				typegooseClass: FishModel,
				schemaOptions: {
					collection: 'fishsets',
				},
			},
		]),
		ConfigModule,
	],
	providers: [FotosetService],
	controllers: [PhotosetController],
})
export class FotosetModule {}
