import { Module } from '@nestjs/common'
import { FishsetsController } from './fishsets.controller'
import { FishsetsService } from './fishsets.service'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { FishModel } from './fishsets.model'

@Module({
	controllers: [FishsetsController],
	imports: [
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
	providers: [FishsetsService],
})
export class FishsetsModule {}
