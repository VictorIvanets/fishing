import { z } from "zod"

export const userRegisterSchema = z.object({
  login: z
    .string({
      required_error: "login є обов’язковим",
    })
    .min(4, "login є обов’язковим, не менше 4х символів"),
  password: z
    .string({
      required_error: "Пароль є обов’язковим",
    })
    .min(4, "Пароль є обов’язковим, не менше 4х символів"),
  name: z
    .string({
      required_error: "Ім’я є обов’язковим",
    })
    .min(2, "Ім’я є обов’язковим, не менше 2х символів"),
  subname: z
    .string({
      required_error: "Прізвище є обов’язковим",
    })
    .min(2, "Прізвище є обов’язковим, не менше 2х символів"),
  country: z
    .string({
      required_error: "Країна є обов’язковим полем",
    })
    .min(2, "Країна є обов’язковим, не менше 2х символів"),
  city: z
    .string({
      required_error: "Місто є обов’язковим",
    })
    .min(2, "Місто є обов’язковим, не менше 2х символів"),
})

export type UserRegisterDataFields = z.infer<typeof userRegisterSchema>
