import { z } from 'zod';

export const Subject = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  maxFaults: z.number().int().nonnegative("O máximo de faltas deve ser um número inteiro não negativo"),
});

export const UpdateSubject = Subject.partial();
