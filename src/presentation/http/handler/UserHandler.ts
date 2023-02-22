require("dotenv").config();
import { Request, Response, Router } from "express";
import UserRepository from "../../../infrastructure/database/mysql/UserRepository";
import { Connection } from "mysql2";
import Middleware from "./Middleware";


export default (connection: Connection): Router => {
  const router = Router();

  let userRepository = new UserRepository(connection);

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    try {
      res
        .status(200)
        .json({
          status: "success",
          message: "Login successfull!",
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

  router.get("/me", Middleware.authentication, async (req: Request, res: Response): Promise<void>  => {

    try {
      let user = res.locals.user;
      console.log(200);
      
      res
        .status(200)
        .json({
          status: "success", // "success" / "fail" / "error"
          message: "success get author",
          data: {
            name: {
              first: user.name.first,
              last: user.name.last
            },
            email: user.email.string(),
          },
        })
        .end();
    } catch (error) {
      res
        .status(403)
        .json({
          status: "error"
        })
        .end();
    }
  });

  return router;
};
