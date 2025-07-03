import * as z from 'zod/v4';

export const newQuotePayload = z
  .object({
    quote: z.string().min(5).trim().toLowerCase(),
  })
  .strict();

export type NewQuote = z.infer<typeof newQuotePayload>;
