import { z } from 'zod';

export const User = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().nullable().optional(),
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export const UpdateUser = User.partial();
