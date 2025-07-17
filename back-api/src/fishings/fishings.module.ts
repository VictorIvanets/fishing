import { Global, Module } from '@nestjs/common'
import { FishingsController } from './fishings.controller'
import { FishingsService } from './fishings.service'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { FishingsModel } from './fishings.model'

@Global()
@Module({
	controllers: [FishingsController],
	imports: [
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
	providers: [FishingsService],
})
export class FishingsModule {}
