import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import router from './routes';
import passport from 'passport';
import { passportMiddleware } from './middlewares';

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set('port', config.port);
  }

  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(passport.initialize());
    passport.use(passportMiddleware);
  }

  private routes() {
    this.app.use(router);
  }

  async listen(): Promise<void> {
    var server = this.app.listen(this.app.get('port'));
    // sets the timeout to 30 seconds. just for developing.
    // server.timeout = 30000;
    if (process.env.NODE_ENV === 'production') {
      console.log(process.env.NODE_ENV);
    } else {
      console.log('Server on port', this.app.get('port'));
    }
  }
}
