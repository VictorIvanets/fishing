import { z } from "zod";

export const commentSchema = z.object({
  comment: z
    .string({
      required_error: "Напишіть коментар",
    })
    .min(1, "Коментар, не менше 1го символа"),
});

export type CommentSchemaDataFields = z.infer<typeof commentSchema>;
