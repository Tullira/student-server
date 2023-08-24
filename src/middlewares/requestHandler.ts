import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  // se não houver status, a response já foi enviada e não precisa ser enviada uma segunda vez
  if (!res.locals.status) {
    console.warn(
      'Parece que você está usando res.send() ou res.json() diretamente no controller. Isso não vai impedir seu código de funcionar, mas deixa a base de código inconsistente.\nIdealmente, use res.locals em vez disso e chame next().\nUm exemplo pode ser visto em src/controllers/UserController.ts.',
    );
    return;
  }
  res
    .status(res.locals.status)
    .json({ data: res.locals.data, message: res.locals.message });
};

export default requestHandler;
