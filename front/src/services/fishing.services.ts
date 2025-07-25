import { api } from "src/api/api"
import { API_ENDPOINTS } from "./API_ENDPOINTS"
import { AxiosError } from "axios"
import type { FishingPayloadT, OneFishingT } from "src/types/fishing"

class FishingServices {
  public async create(payload: FishingPayloadT): Promise<OneFishingT> {
    try {
      const result = await api.post(
        API_ENDPOINTS.FISHING.CREATE_POST,
        payload,
        {
          withCredentials: false,
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

  public async update(
    _id: number,
    payload: FishingPayloadT
  ): Promise<OneFishingT> {
    try {
      const result = await api.post(
        `${API_ENDPOINTS.FISHING.UPDATE_POST}${_id}`,
        payload,
        {
          withCredentials: false,
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

  public async getOne(_id: string): Promise<OneFishingT> {
    try {
      const result = await api.get(
        `${API_ENDPOINTS.FISHING.GET_ONE_BY_ID}${_id}`
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

  public async getAllByUser(): Promise<OneFishingT[]> {
    try {
      const result = await api.get(API_ENDPOINTS.FISHING.GET_ALL_BY_USER)
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

  public async getAll(): Promise<OneFishingT[]> {
    try {
      const result = await api.get(API_ENDPOINTS.FISHING.GET_ALL)
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

  public async delete(_id: string): Promise<OneFishingT> {
    try {
      const result = await api.delete(`${API_ENDPOINTS.FISHING.DELETE}${_id}`)
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

export const fishingServices = new FishingServices()
