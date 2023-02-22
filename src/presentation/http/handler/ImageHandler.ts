require("dotenv").config();
import { Request, Response, Router } from "express";
import ImageRepository from "../../../infrastructure/database/mysql/ImageRepository";
import { Connection } from "mysql2";


export default (connection: Connection): Router => {
  const router = Router();

  let imageRepository = new ImageRepository(connection);
  router.get("/images/:id", async (req: Request, res: Response):Promise<any> => {
    try {
      let image = await imageRepository.getImage(req.params.id);
        res
          .status(200)
          .json({
            status: "success",
            message: "success get image",
            data: {
              id: image.id,
              imageURL: {
                original_url: image.url.original,
                thumbnail_url: image.url.thumbnail,
              },
              alt: image.alt,
              dimension: {
                height: image.dimension.height,
                width: image.dimension.width,
              },
            },
          })
    } catch (error) {
      res
        .status(404)
        .json({
          status: "error",
        })
        .end();
    }
  });

 
  return router;
};
