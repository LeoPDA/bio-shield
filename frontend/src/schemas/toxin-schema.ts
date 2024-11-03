import { z } from "zod";

export const toxinSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  classification: z.string(),
  description: z.string(),
  usage: z.string(),
  risks: z.string(),
  safety_recommendations: z.string(),
  containment_plans: z.string(),
  impact_assessment: z.string(),
  access_level: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Toxin = z.infer<typeof toxinSchema>;
