require("dotenv").config();

import { Router, Request, Response } from "express";
import User from "../../domain/entity/User";
import UserRepository from "../../domain/repository/UserRepository";
import Email from "../../domain/valueobject/Email";
import Status from "../../Status";
import jwt from 'jsonwebtoken';
import UserMapper from "./UserMapper";

export default class UserHandler {
  public static router(userRepository: UserRepository): Router {
    const router: Router = Router();

    router.use('/login', async (req: Request, res: Response) => {
      try {
        let email: Email = new Email(req.body.email)
        let user: User = await userRepository.getUser(email)
        let userMapper: UserMapper = new UserMapper(user)
  
        if (user.password.verify(req.body.password)) {
          res.status(200).json({
            status: Status.Success,
            data: {
              access_token: jwt.sign(
                userMapper.toJSON(),
                String(process.env.ACCESS_TOKEN_SECRET),
                {
                  expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES_IN)
                }
              ),
              refresh_token: jwt.sign(
                userMapper.toJSON(),
                String(process.env.REFRESH_TOKEN_SECRET)
              )
            }
          }).end();
  
          return;
        }
  
        res.status(404).json({
          status: Status.Fail,
          message: 'user not found'
        }).end();
      } catch (err) {
        console.error(err);
  
        res.status(500).json({
          status: Status.Error,
          message: 'failed to login'
        }).end();
      }
		})

    return router
  }
}