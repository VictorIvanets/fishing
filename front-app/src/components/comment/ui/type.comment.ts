export interface CommentsProps {
	login: string
	setId: string | undefined
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
