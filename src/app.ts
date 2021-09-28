import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
// import { requestHandler, errorHandler } from './middlewares';
import swaggerDocument from './docs';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(errorHandler);
// app.use(requestHandler);

export default app;
