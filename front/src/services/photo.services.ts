import { api } from "src/api/api"
import { API_ENDPOINTS } from "./API_ENDPOINTS"
import { AxiosError } from "axios"
import type {
  DelPhotoByIdResponseT,
  ResponseGetPhoto,
} from "src/types/photo.types"

export type uploadPhotoResponseT = {
  name: string
  url: string
}

class PhotoServices {
  public async uploadPhoto(payload: {
    _id: string
    formData: FormData
  }): Promise<uploadPhotoResponseT> {
    try {
      const result = await api.post(
        `${API_ENDPOINTS.PHOTO.UPLOAD}${payload._id}`,
        payload.formData,
        {
          withCredentials: false,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
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

  public async getFotoInFolder(setid: string): Promise<ResponseGetPhoto[]> {
    try {
      const result = await api.get(`${API_ENDPOINTS.PHOTO.DOWNLOAD}${setid}`, {
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

  public async deletePhoto(dto: {
    photoId: string
    setId: string
  }): Promise<DelPhotoByIdResponseT> {
    try {
      const result = await api.post(API_ENDPOINTS.PHOTO.DELETE, dto, {
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
}

export const photoServices = new PhotoServices()
