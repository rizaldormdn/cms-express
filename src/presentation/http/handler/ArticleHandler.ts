import { Request, Response, Router } from "express";
import { query, Result, ValidationError, validationResult } from "express-validator";
import { Connection } from "mysql2";
import Specification from "../../../application/valueobject/Specification";
import ArticleRepository from "../../../infrastructure/database/mysql/ArticleRepository";



export default (connection: Connection): Router => {
     const router = Router()

     router.get("/articles/featured",
          async (req: Request, res: Response): Promise<void> => {
               try {

                    const article = new ArticleRepository(connection)
                    let data = await article.getFeaturedArticles()
                    console.log(data);
                    res
                         .status(200)
                         .json({
                              status: "success",
                              data: data
                         }).end()
               } catch (err) {
                    console.error(err)
                    res
                         .status(400)
                         .json({
                              status: "error",
                              error: err
                         }).end()
               }
          })

     router.get("/articles",
          query('search').isString(),
          async (req: Request, res: Response): Promise<void> => {
               let errors: Result<ValidationError> = validationResult(req)

               if (!errors.isEmpty()) {
                    res
                         .status(400)
                         .json({
                              status: "error",
                              error: errors.array()
                         })
                    return
               }
               try {
                    let search = req.query.search as string || ''
                    let page = Number(req.query.page || 1)

                    let specification: Specification = new Specification(search, page)
                    let article = new ArticleRepository(connection)
                    
                    let data = await article.getArticles(specification)
                    console.log(data);
                    res
                         .status(200)
                         .json({
                              status: "success",
                              data: data
                         }).end()
               } catch (err) {
                    res
                         .status(200)
                         .json({
                              status: "error",
                              error: err
                         }).end()
               }
          })
     return router
}