export type LoginPayloadT = {
  login: string
  password: string
}
export type RegisterPayloadT = {
  login: string
  password: string
  name: string
  subname: string
  country: string
  city: string
}
export type RegisterResponseT = {
  _id: string
  login: string
  passwordHash: string
  name: string
  subname: string
  country: string
  city: string
  createdAt: string
  updatedAt: string
}

export interface RegisterState {
  data: RegisterResponseT | null
  errorMassege: string | undefined
  isLoading: boolean
}

export type LoginResponseT = {
  access_token: string
  login: string
  _id: string
}

export type LoginForm = {
  login: {
    value: string
  }
  password: {
    value: string
  }
}

export type LoginAuthState = {
  access_token: string | null
  login: string | null
  _id: string | undefined
}

export interface UserState {
  authinfo: LoginAuthState | undefined
  errorMassege: string | undefined
  isLoading: boolean
  userInfo: UserInfoT | null
}

export type UserInfoT = {
  login: string
  passwordHash: string
  name: string
  subname: string
  country: string
  city: string
}
