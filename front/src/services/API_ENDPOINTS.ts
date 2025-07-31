export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    USER_INFO: "auth/userinfo",
  },
  FISHING: {
    GET_ALL_BY_USER: "fishings/user",
    GET_ALL: "fishings/all",
    GET_ALL_FOR_MAP: "fishings/allformap",
    GET_ONE_BY_ID: "fishings/onesets/",
    CREATE_POST: "fishings/create",
    UPDATE_POST: "fishings/update/",
    DELETE: "fishings/",
  },
  PHOTO: {
    UPLOAD: "photo/upload/",
    DOWNLOAD: "getfoto/get/",
    DELETE: "fishings/deletephoto",
  },
  COMMENTS: {
    CREATE: "comment/add",
    GET: "comment/",
    DELETE_ONE: "comment/",
    DELETE_BY_SETID: "comment/set/",
  },
  CHECK: "auth/check",
} as const
