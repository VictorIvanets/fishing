import { ApolloError } from '@apollo/client'

interface CheckData {
	userId: string
	user: string
}

export interface ICheckIn {
	userInByUserName: (newUser: string, userId: string) => void
	loadingChecIn: boolean
	errorCheckIn: ApolloError | undefined
	userIn: CheckData
}

export interface ICheckOut {
	userOutByUserId: (userId: string) => void
	loadingCheckOut: boolean
	errorCheckOut: ApolloError | undefined
	checkOut: boolean
}

export type ChekForm = {
	id: {
		value: string
	}
}

export interface UserData {
	userId: string
	user: string
}

export interface UseSubCheck {
	loading: boolean
	subdata: UserData[]
}

export interface UseSubCheckComment {
	loadingSub: boolean
	subdataComment: CommentData[]
}

export interface InewCommentData {
	user: string
	comment: string
}

export interface CommentData {
	comId: string
	comment: string
	user: string
	createdAt: Date
}

export interface IAddComment {
	addedComment: (user: string, comment: string) => void
	loadingAddComment: boolean
	errorAddComment: ApolloError | undefined
	addComment: CommentData
}

export interface IDelComment {
	deletedCommentById: (comId: string) => void
	loadingDelComment: boolean
	errorDelComment: ApolloError | undefined
	delComment: boolean
}

export interface IAllComment {
	loading: boolean
	error: ApolloError | undefined
	allComm: CommentData[]
}

export interface CommentSubmit {
	comment: {
		value: string
	}
}
