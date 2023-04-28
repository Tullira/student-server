import { z } from 'zod';

export const User = z.object({
  name: z.string({ required_error: 'O nome é obrigatório' }).nonempty(),
  phone: z.string().optional(),
  email: z.string({ invalid_type_error: 'Email invalido', required_error: 'O email é obrigatório' }).email(),
  password: z.string().nonempty().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});
