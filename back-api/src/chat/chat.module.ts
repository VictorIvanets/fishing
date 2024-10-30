import { Global, Module } from '@nestjs/common'
import { DateScalar } from 'src/common/scalars/date.scalar'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { ChatResolver } from './chat.resolver'
import { ChatService } from './chat.service'
import { Chat } from './models/chat.model'

@Global()
@Module({
	providers: [ChatResolver, ChatService, DateScalar],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: Chat,
				schemaOptions: {
					collection: 'chat',
				},
			},
		]),
		ConfigModule,
	],
	exports: [ChatService],
})
export class ChatModule {}
