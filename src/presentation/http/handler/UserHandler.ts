import { Request, Response, Router } from "express";
import UserRepository from "../../../infrastructure/database/mysql/UserRepository";
import mysql, { Connection } from "mysql2";
import Email from "../../../domain/valueobject/Email";
require("dotenv").config();

export default (): Router => {
  const connection: Connection = mysql.createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_USERPASS,
    database: process.env.DB_NAME,
  });

  const router = Router();

  router.get("/me", (req: Request, res: Response) => {
    let user = new UserRepository(connection);
    let { email } = req.body;
    user
      .getAuthor(email)
      .then((data) => {
        res
          .status(200)
          .json({
            status: "success get author",
            data: {
              method: req.method,
              url: req.url,
              data: data,
            },
          })
          .end();
      })
      .catch((err) => {
        res
          .status(404)
          .json({
            status: "failed get author",
            data: {
              method: req.method,
              url: req.url,
              error: err,
            },
          })
          .end();
      });

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
