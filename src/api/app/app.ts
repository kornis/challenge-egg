import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    dotenv.config({ path: ".env" });
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);
  }

  routes() {}

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`server listening to port ${this.app.get("port")}`)
    );
  }
}

const server = new App();
server.start();
