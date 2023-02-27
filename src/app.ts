require("dotenv").config();

import mysql, { Connection } from "mysql2";
import nodemailer from "nodemailer";
import AdministratorService from "./user/application/service/AdministratorService";
import ConfirmationService from "./user/application/service/ConfirmationService";
import ResetPasswordService from "./user/application/service/ResetPasswordService";
import UserService from "./user/application/service/UserService";
import ArticleRepository from "./article/domain/repository/ArticleRepository";
import ArticleRepositoryMySQL from "./article/infrastructure/database/mysql/ArticleRepository"
import ImageRepositoryMySQL from "./image/infrastructure/database/mysql/ImageRepository"
import UserRepository from "./user/domain/repository/UserRepository";
import UserRepositoryMySQL from "./user/infrastructure/database/mysql/UserRepository";
import EmailConfirmationService from "./user/infrastructure/service/confirmation/EmailConfirmationService";
import Router from "./Router";
import Server from "./Server";
import ArticleService from "./article/domain/service/ArticleService";
import ImageRepository from "./image/domain/repository/ImageRepository";
import ImageService from "./image/application/service/ImageService";

const connection: Connection = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_USERPASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});
const userRepository: UserRepository = new UserRepositoryMySQL(connection)
const articleRepository: ArticleRepository = new ArticleRepositoryMySQL(connection)
const imageRepository: ImageRepository = new ImageRepositoryMySQL(connection)
const userService: UserService = new UserService(userRepository)
const imageService: ImageService = new ImageService(imageRepository)
const articleService: ArticleService = new ArticleService(articleRepository)
const emailConfirmationService: ConfirmationService = new EmailConfirmationService(
  nodemailer.createTransport({
    host: process.env.EMAIL_TRANSPORT_HOST,
    port: Number(process.env.EMAIL_TRANSPORT_PORT),
    service: process.env.EMAIL_TRANSPORT_SERVICE,
    auth: {
      user: process.env.EMAIL_TRANSPORT_USER,
      pass: process.env.EMAIL_TRANSPORT_PASS
    }
  }),
  {
    from: process.env.EMAIL_SENDER
  },
)
const administratorService: AdministratorService = new AdministratorService(userRepository, emailConfirmationService)
const resetPasswordService: ResetPasswordService = new ResetPasswordService(userRepository)

Server.run(
  Number(process.env.PORT),
  Router.run(
    userRepository,
    imageRepository,
    articleRepository,
    userService,
    imageService,
    articleService,
    administratorService,
    resetPasswordService
  )
)