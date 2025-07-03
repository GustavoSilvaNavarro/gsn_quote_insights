import * as z from 'zod/v4';

export const quoteIdParam = z
  .object({
    quoteId: z.coerce.number().int().positive(),
  })
  .strict();

export type QuoteIdParam = z.infer<typeof quoteIdParam>;
