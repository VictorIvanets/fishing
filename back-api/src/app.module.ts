import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './config/mongo-config'
import { FishsetsModule } from './fishsets/fishsets.module'
import { FotosetModule } from './fotoset/fotoset.module'
import { CommentModule } from './comment/comment.module'
import { GetfotoModule } from './getfoto/getfoto.module'

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
		FotosetModule,
		CommentModule,
		GetfotoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
