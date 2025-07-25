export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    USER_INFO: "auth/userinfo",
  },
  FISHING: {
    GET_ALL_BY_USER: "fishings/user",
    GET_ALL: "fishings/all",
    GET_ONE_BY_ID: "fishings/onesets/",
    CREATE_POST: "fishings/create",
    UPDATE_POST: "fishings/update/",
    DELETE: "fishings/",
  },
  CHECK: "auth/check",
} as const
