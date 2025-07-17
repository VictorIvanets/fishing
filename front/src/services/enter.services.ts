import { api } from "src/api/api"
import { API_ENDPOINTS } from "./API_ENDPOINTS"
import { AxiosError } from "axios"

class EnterServices {
  public async checkLoadingServer(): Promise<string> {
    console.log("checkLoadingServer")
    try {
      const result = await api.get<string>(`${API_ENDPOINTS.CHECK}`, {
        withCredentials: false,
      })
      return result.data
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data) {
          return e.response.data.message
        }
        return e.message
      }
      return "Unexpected error"
    }
  }
}

export const enterServices = new EnterServices()
