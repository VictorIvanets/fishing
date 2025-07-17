import { z } from "zod"

export const userLogInSchema = z.object({
  login: z
    .string({
      required_error: "login є обов’язковим",
    })
    .min(2, "Ім’я є обов’язковим, не менше 2х символів"),
  password: z
    .string({
      required_error: "Пароль є обов’язковим",
    })
    .min(4, "Пароль є обов’язковим, не менше 4х символів"),
})

export type UserLogInDataFields = z.infer<typeof userLogInSchema>
