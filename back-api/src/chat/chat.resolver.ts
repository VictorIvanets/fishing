import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { NewCommentInput } from './dto/new-comment.input'
import { ChatService } from './chat.service'
import { Chat } from './models/chat.model'

const pubSub = new PubSub()

@Resolver(() => Chat)
export class ChatResolver {
	constructor(private readonly chatService: ChatService) {}

	@Query(() => Chat)
	async comment(@Args('comId') comId: string): Promise<Chat> {
		const comment = await this.chatService.findOneById(comId)
		if (!comment) {
			throw new NotFoundException(comId)
		}
		return comment
	}

	@Query(() => [Chat])
	allComments(): Promise<Chat[]> {
		return this.chatService.findAll('chat')
	}

	@Mutation(() => Chat)
	async addComment(
		@Args('newCommentData') newCommentData: NewCommentInput,
	): Promise<Chat> {
		const comment = await this.chatService.create(newCommentData)

		const allComment = await this.chatService.findAll('chat')

		pubSub.publish('commentAdded', { commentAdded: allComment })
		return comment
	}

	@Mutation(() => Boolean)
	async deleteComment(@Args('comId') comId: string): Promise<boolean> {
		const chek = await this.chatService.remove(comId)
		const allComment = await this.chatService.findAll('chat')
		pubSub.publish('commentAdded', { commentAdded: allComment })
		return chek
	}

	@Subscription(() => [Chat])
	commentAdded(): AsyncIterator<unknown, any, any> {
		return pubSub.asyncIterator('commentAdded')
	}
}
