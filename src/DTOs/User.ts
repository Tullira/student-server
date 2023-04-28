import { z } from 'zod';

export const User = z.object({
  name: z.string().nonempty(),
  phone: z.string(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
