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
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { ChatModule } from './chat/chat.module'
import { UserInOutModule } from './userInOut/userInOut.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema.gql',
			transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
			playground: true,
			subscriptions: {
				'graphql-ws': true,
				'subscriptions-transport-ws': true,
			},
			buildSchemaOptions: {
				directives: [
					new GraphQLDirective({
						name: 'upper',
						locations: [DirectiveLocation.FIELD_DEFINITION],
					}),
				],
			},
		}),
		UserInOutModule,
		ChatModule,
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
