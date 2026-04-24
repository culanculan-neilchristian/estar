import { z } from 'zod';

export const ChurchDataSchema = z.object({
  id: z.string(),
  submittedTime: z.string(),
  churchName: z.string(),
  yearBegan: z.string().optional(),
  type: z.string().optional(),
  village: z.number().default(0),
  province: z.string(),
  amphoe: z.string(),
  tambon: z.string(),
  participate: z.number().default(0),
  coordinates: z.string().optional(),
  status: z.string(),
  imageMain: z.string().optional(),
});

export type ChurchData = z.infer<typeof ChurchDataSchema>;
