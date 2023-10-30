import z from "zod";

const envSchema = z.object({
    PEXELS_API_KEY : z.string(),
});

export const env = envSchema.parse(process.env)