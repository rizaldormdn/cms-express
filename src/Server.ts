import express, { Express, Router } from "express";
import Middleware from "./Middleware";

export default class Server {
  public static run(port: number, router: Router) {
    const app: Express = express();

    app.use(express.json())
    app.use(Middleware.cors);
    app.use('/', router)
    app.listen(port, () => {
      console.log(`The HTTP server is running on port ${port}.`);
    })
  }
}