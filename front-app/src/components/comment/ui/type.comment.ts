export interface CommentsProps {
	login: string
	setId: string | undefined
}

export interface SetCommentProps extends CommentsProps {
	setIsLoading: (isLoading: boolean) => void
	isLoading: boolean
}

export interface CommentSubmit {
	comment: {
		value: string
	}
}

export interface CommentItem {
	login: string
	setId: string | undefined
	comment: string
	commId: number
}

export interface CommentItemProps extends CommentItem {
	setIsLoading: (isLoading: boolean) => void
	isLoading: boolean
}
