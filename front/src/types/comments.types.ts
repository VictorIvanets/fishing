export type CommentT = {
  login: string
  useId: string
  setId: string
  comment: string
}
export type CommentResponseT = {
  _id: string
  login: string
  useId: string
  setId: string
  comment: string
  createdAt: string
}

export type DelByIdResponseT = {
  success: boolean
  id?: string
  message?: string
}
