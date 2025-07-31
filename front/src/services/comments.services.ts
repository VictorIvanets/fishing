import { api } from "src/api/api"
import { API_ENDPOINTS } from "./API_ENDPOINTS"
import { AxiosError } from "axios"
import type {
  CommentResponseT,
  CommentT,
  DelByIdResponseT,
} from "src/types/comments.types"

class CommentsServices {
  public async create(payload: CommentT): Promise<CommentResponseT> {
    try {
      const result = await api.post(API_ENDPOINTS.COMMENTS.CREATE, payload, {
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

  public async getAllByFishingId(_id: string): Promise<CommentResponseT[]> {
    try {
      const result = await api.get(`${API_ENDPOINTS.COMMENTS.GET}${_id}`)
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

  public async deleteItem(_id: string): Promise<DelByIdResponseT> {
    try {
      const result = await api.delete(
        `${API_ENDPOINTS.COMMENTS.DELETE_ONE}${_id}`
      )
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

export const commentsServices = new CommentsServices()
