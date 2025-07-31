import { z } from "zod"

export const commentSchema = z.object({
  comment: z
    .string({
      required_error: "Напишіть коментар",
    })
    .min(2, "Коментар, не менше 2х символів"),
})

export type CommentSchemaDataFields = z.infer<typeof commentSchema>
