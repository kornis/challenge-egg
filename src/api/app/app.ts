import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { userRoute, indexRoute } from "../routes";
class App {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: ".env" });
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(indexRoute);
    this.app.use("/user", userRoute);
    this.app.use("*", (req: Request, res: Response) => res.send("No autorizado"));
  }

  start() {
    this.app.listen(this.app.get("port"), () => console.log(`server listening to port ${this.app.get("port")}`));
  }
}

const server = new App();
server.start();
