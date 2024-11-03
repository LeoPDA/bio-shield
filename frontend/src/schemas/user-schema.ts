import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  access_level: z.number(),
});

export type User = z.infer<typeof userSchema>;
