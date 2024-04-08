import { z } from 'zod';

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().optional().default(3000),
    SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;
