require('dotenv').config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Status from "./Status";

export default class Middleware {
  public static cors(_: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', String(process.env.ORIGINS));
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  
    next();
  }

  public static authentication(req: Request, res: Response, next: NextFunction) {
    try {
      let token = String(req.headers['authorization']).split(' ')[1];

      res.locals.user = jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET)
      )

      next()
    } catch (err) {
      console.error(err)
  
      res.status(403).json({
        status: Status.Error,
        message: 'failed to verify the token'
      }).end();

      return;
    }
  }
}