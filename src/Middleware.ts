import { Request, Response, NextFunction } from "express";

export default class Middleware {
  public static cors(_: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', String(process.env.ORIGINS));
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  
    next();
  }
}