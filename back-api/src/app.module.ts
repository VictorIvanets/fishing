import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './config/mongo-config'
import { FishsetsController } from './fishsets/fishsets.controller'
import { FishsetsService } from './fishsets/fishsets.service'
import { FishsetsModule } from './fishsets/fishsets.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		FishsetsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
