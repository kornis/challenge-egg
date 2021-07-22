import express from "express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
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
