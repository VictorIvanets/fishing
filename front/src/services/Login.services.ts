import { api } from "src/api/api"
import { API_ENDPOINTS } from "./API_ENDPOINTS"
import type {
  LoginPayloadT,
  LoginResponseT,
  RegisterPayloadT,
  RegisterResponseT,
  UserInfoT,
} from "src/types/auth.types"
import { AxiosError } from "axios"

class LoginServices {
  public async login(payload: LoginPayloadT): Promise<LoginResponseT> {
    try {
      const result = await api.post(`${API_ENDPOINTS.AUTH.LOGIN}`, payload, {
        withCredentials: false,
      })
      return result.data
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message)
        }
        throw new Error(e.message)
      }
      throw new Error("Unexpected error")
    }
  }

  public async register(payload: RegisterPayloadT): Promise<RegisterResponseT> {
    try {
      const result = await api.post(`${API_ENDPOINTS.AUTH.REGISTER}`, payload)

      return result.data
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message)
        }
        throw new Error(e.message)
      }
      throw new Error("Unexpected error")
    }
  }

  public async userInfo(): Promise<UserInfoT> {
    try {
      const result = await api.get(`${API_ENDPOINTS.AUTH.USER_INFO}`)
      return result.data
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          throw new Error(e.response.data.message)
        }
        throw new Error(e.message)
      }
      throw new Error("Unexpected error")
    }
  }
}

export const loginServices = new LoginServices()
