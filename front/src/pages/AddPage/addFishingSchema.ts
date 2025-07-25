import { z } from "zod"

export const addFishingSchema = z.object({
  title: z
    .string({
      required_error: "Назва є обов’язковою",
    })
    .min(2, "Назва є обов’язковим, не менше 3х символів"),
  description: z
    .string({
      required_error: "Опис є обов’язковим",
    })
    .min(4, "Опис є обов’язковим, не менше 10ти символів"),
  score: z
    .number({
      required_error: "Оцінка є обов’язковою",
      invalid_type_error: "Оцінка повинна бути числом",
    })
    .min(0, "Оцінка не може бути меншою за 0")
    .max(10, "Оцінка не може бути більшою за 10"),
  date: z
    .string({
      required_error: "Дата є обов’язковою",
    })
    .min(8, "Дата є обов’язковою"),
})

export type AddFishingSchemaDataFields = z.infer<typeof addFishingSchema>
