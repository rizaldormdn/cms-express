import { Request, Response, Router } from "express";
import UserRepository from "../../../infrastructure/database/mysql/UserRepository";
import mysql, { Connection } from "mysql2";
require("dotenv").config();

export default (connection: Connection): Router => {
  const router = Router();

  let User = new UserRepository(connection);

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    try {
      res
        .status(200)
        .json({
          status: "success",
          message: "Login successful!",
          data: { email },
        })
        .end();
    } catch (error) {
      res
        .status(400)
        .json({
          status: "error",
          message: "Invalid Credential!",
          data: { email, password },
        })
        .end();
    }
  });

  router.get("/me", async (req: Request, res: Response) => {
    let { email } = req.body;

    try {
      let user = await User.getAuthor(email);
      res
        .status(200)
        .json({
          status: "success get author",
          data: {
            method: req.method,
            url: req.url,
            data: user,
          },
        })
        .end();
    } catch (error) {
      res
        .status(404)
        .json({
          status: "failed get author",
          data: {
            method: req.method,
            url: req.url,
            error: error,
          },
        })
        .end();
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "server is alive",
        data: {
          method: req.method,
          url: req.url,
        },
      })
      .end();
  });

  return router;
};
