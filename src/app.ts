import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import expressWinston from 'express-winston';
import routes from './routes';
import swaggerDocument from './docs';
import { requestHandler, errorHandler, requestLogger } from './middlewares';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressWinston.logger({ winstonInstance: requestLogger, statusLevels: true }),
);
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
app.use(requestHandler);
app.use(expressWinston.errorLogger({ winstonInstance: requestLogger }));

export default app;
