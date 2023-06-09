require("dotenv").config();

import { Router, Request, Response } from "express";
import UserRepository from "../../../user/domain/repository/UserRepository";
import Email from "../../domain/valueobject/Email";
import Name from "../../domain/valueobject/Name";
import Status from "../../../Status";
import jwt from 'jsonwebtoken';
import UserMapper, { AuthorMapper } from "../../presentation/http/UserMapper";
import Middleware from "../../../Middleware";
import AdministratorService from "../../application/service/AdministratorService";
import Administrator from "../../domain/entity/Administrator";
import Author from "../../domain/entity/Author";
import User from "../../domain/entity/User";
import ResetPasswordService from "../../application/service/ResetPasswordService";
import Password from "../../domain/valueobject/Password";
import UserService from "../../application/service/UserService";
import { AuthorSnapshots } from "../../application/valueobject/AuthorSnapshot";

export default class UserHandler {
  public static router(
    userRepository: UserRepository,
    userService: UserService,
    administratorService: AdministratorService,
    resetPasswordService: ResetPasswordService
  ): Router {
    const router: Router = Router();

    router.post('/login', async (req: Request, res: Response) => {
      try {
        let email: Email = new Email(req.body.email)
        let user: User | undefined = await userRepository.getUser(email)

        if (!user) {
          res.status(404).json({
            status: Status.Fail,
            message: 'user not found'
          }).end();

          return
        }
  
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
        console.error(err)

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
          user: UserMapper.fromJSON(res.locals.user)
        }
      }).end();
    })

    router.post('/register', Middleware.authentication, async (req: Request, res: Response) => {
      if (!res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end();
      }

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
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to register'
        }).end();
      }
    })

    router.post('/reset-password', async (req: Request, res: Response) => {
      if (req.body.password !== req.body.password_confirmation) {
        res.status(400).json({
          status: Status.Error,
          message: 'failed to confirm a password'
        }).end();

        return
      }

      try {
        let newPassword: Password = new Password()

        newPassword.hash(req.body.password)

        await resetPasswordService.resetPassword(req.body.token, newPassword)

        res.status(200).json({
          status: Status.Success
        }).end();
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to reset a password'
        }).end();
      }
    })

    router.post('/change-name', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let email = new Email(res.locals.user.email)
        let name = new Name(res.locals.user.first_name, res.locals.user.last_name)
        let password = new Password(res.locals.user.password, res.locals.user.hashed_password)
        let user = new User(email, name, res.locals.user.is_administrator, password)
        let newName = new Name(req.body.first_name, req.body.last_name)

        await userService.changeName(user, newName)

        res.status(200).json({
          status: Status.Success,
        }).end();
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to change name'
        }).end();
      }
    })

    router.post('/update-password', Middleware.authentication, async (req: Request, res: Response) => {
      if (req.body.password !== req.body.password_confirmation) {
        res.status(400).json({
          status: Status.Error,
          message: 'failed to update a password'
        }).end();

        return
      }

      try {
        let email = new Email(res.locals.user.email)
        let name = new Name(res.locals.user.first_name, res.locals.user.last_name)
        let user = new User(email, name)
        let newPassword = new Password()

        newPassword.hash(req.body.password)

        await userService.updatePassword(user, newPassword)

        res.status(200).json({
          status: Status.Success,
        }).end();
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to update a password'
        }).end();
      }
    })

    router.get('/authors', Middleware.authentication, async (_: Request, res: Response) => {
      if (!res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end();
      }

      try {
        let authors: AuthorSnapshots = await userRepository.getAuthors()

        res.status(200).json({
          status: Status.Success,
          data: AuthorMapper.toJSON(authors)
        }).end();
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get authors'
        }).end();
      }
    })

    router.delete('/authors/:email', Middleware.authentication, async (req: Request, res: Response) => {
      if (!res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end();
      }

      try {
        let email: Email = new Email(req.params.email)

        await userRepository.deleteAuthor(email)

        res.status(200).json({
          status: Status.Success
        }).end();
      } catch (err) {
        console.error(err);

        res.status(500).json({
          status: Status.Error,
          message: 'failed to delete an author'
        }).end();
      }
    })

    return router
  }
}