require("dotenv").config();

import { Router, Request, Response } from "express";
import UserRepository from "../../domain/repository/UserRepository";
import Email from "../../domain/valueobject/Email";
import Name from "../../domain/valueobject/Name";
import Status from "../../Status";
import jwt from 'jsonwebtoken';
import UserMapper from "./UserMapper";
import Middleware from "../../Middleware";
import AdministratorService from "../../application/service/AdministratorService";
import Administrator from "../../domain/entity/Administrator";
import Author from "../../domain/entity/Author";
import User from "../../domain/entity/User";

export default class UserHandler {
  public static router(userRepository: UserRepository, administratorService: AdministratorService): Router {
    const router: Router = Router();

    router.post('/login', async (req: Request, res: Response) => {
      try {
        let email: Email = new Email(req.body.email)
        let user: User = await userRepository.getUser(email)
  
        if (user.password!.verify(req.body.password)) {
          res.status(200).json({
            status: Status.Success,
            data: {
              access_token: jwt.sign(
                UserMapper.toJSON(user),
                String(process.env.ACCESS_TOKEN_SECRET),
                {
                  expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES_IN)
                }
              ),
              refresh_token: jwt.sign(
                UserMapper.toJSON(user),
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

    router.get('/me', Middleware.authentication, (_: Request, res: Response) => {
      res.status(200).json({
        status: Status.Success,
        data: {
          user: res.locals.user
        }
      }).end();
    })

    router.post('/register', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let administrator: Administrator = UserMapper.toAdministrator(res.locals.user)
        let email: Email = new Email(req.body.email);
        let name: Name = new Name(req.body.first_name, req.body.last_name);
        let author: Author = await administratorService.addAuthor(administrator, email, name)

        res.status(200).json({
          status: Status.Success,
          data: UserMapper.toJSON(author)
        }).end();
      } catch (err) {
        console.error(err);
  
        res.status(500).json({
          status: Status.Error,
          message: 'failed to register'
        }).end();
      }
    })

    return router
  }
}