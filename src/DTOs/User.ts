import { z } from 'zod';

export const User = z.object({
  name: z.string().regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }).nonempty({ message: 'O nome não pode ser vazio' }),
  phone: z.string().nullish(),
  email: z.string().email({ message: 'Enedereço de email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

export type userType = z.infer<typeof User>;
