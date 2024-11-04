import { z } from 'zod';

export const UserOnSubject = z.object({
  faults: z.number().int().nonnegative("O número de faltas deve ser um número inteiro não negativo"),
  finished: z.boolean().default(false),
  userId: z.string().uuid(),
  subjectId: z.string().uuid(),
});

export const UpdateUserOnSubject = UserOnSubject.partial();
