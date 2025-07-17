import axios from "axios"
import { PREFIX, STORAGE_KEYS_ACCESS_TOKEN } from "./PREFIX"
import { loadState } from "src/store/storage"
import type { LoginAuthState } from "src/types/auth.types"

export const api = axios.create({
  baseURL: `${PREFIX}`,
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const accessToken = loadState<LoginAuthState>(STORAGE_KEYS_ACCESS_TOKEN)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.access_token}`
  } else {
    config.headers.Authorization = ""
  }

  return config
})
