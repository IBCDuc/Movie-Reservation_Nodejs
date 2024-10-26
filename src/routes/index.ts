import { Application } from 'express-serve-static-core';
import homeRouter from './home';
import adminRouter from './admin'
import apiRouter from './api'
export default function route(app: Application) {
  app.use("/admin", adminRouter)
  app.use("/api",apiRouter )
  app.use("/", homeRouter);
  
}


