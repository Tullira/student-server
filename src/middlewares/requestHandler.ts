import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  // se não houver status, a response já foi enviada e não precisa ser enviada uma segunda vez
  if (!res.locals.status) return;
  res
    .status(res.locals.status)
    .json({ data: res.locals.data, message: res.locals.message });
};

export default requestHandler;
