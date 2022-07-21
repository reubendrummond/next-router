import z from "zod";

export const testSchema = z.object({
  name: z.string(),
  age: z.number().int(),
});
