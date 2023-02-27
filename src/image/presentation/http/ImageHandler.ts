require("dotenv").config();

import multer, { FileFilterCallback } from "multer";
import sanitize from "sanitize-filename";
import crypto from "crypto";
import { Router, Request, Response } from "express";
import Middleware from "../../../Middleware";
import Specification from "../../../Specification";
import Status from "../../../Status";
import Email from "../../../user/domain/valueobject/Email";
import ImageService from "../../application/service/ImageService";
import Image, { Images } from "../../domain/entity/Image";
import ImageRepository from "../../domain/repository/ImageRepository";
import ImageMapper, { ImagesMapper } from "./ImageMapper";
import ImageURL from "../../domain/valueobject/ImageURL";
import Dimension from "../../domain/valueobject/Dimension";

export default class ImageHandler {
  public static router(
    imageRepository: ImageRepository,
    imageService: ImageService
  ): Router {
    const storage = multer.diskStorage({
      destination: (_, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
          cb(new Error('image type is not allowed'), '')

          return
        }
        if (file.fieldname === 'original') {
          cb(null, 'public/images/original/')
        } else {
          cb(null, 'public/images/thumbnail/')
        }
      },
      filename: (_, file, cb) => {
        cb(null, crypto.randomBytes(6).toString("hex") + '_' + sanitize(file.originalname))
      }
    })
    const fileFilter = (
      _: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
        cb(new Error('image type is not allowed'))
      }

      cb(null, true)
    }
    const upload = multer({
      storage: storage,
      limits: { fileSize: 2048000 },
      fileFilter: fileFilter
    }).fields([
      { name: 'original' },
      { name: 'thumbnail' }
    ])
    const router: Router = Router();

    router.get('/images', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let page = Number(req.query.page ?? 1)
        let limit = Number(process.env.LIMIT_ARTICLES)
        let specification: Specification = new Specification(String(req.query.search ?? ''), page)

        if (req.query.author) {
          let authorEmail: Email = new Email(String(req.query.author))
          let images: Images = await imageRepository.getImagesByAuthor(specification, authorEmail)
          let total: number = await imageRepository.countImagesByAuthor(specification, authorEmail)

          res.status(200).json({
            status: Status.Success,
            data: {
              images: ImagesMapper.toJSON(images),
              paging: {
                page: page,
                pages: Math.ceil(total / limit),
                limit: limit,
                total: total
              }
            }
          }).end()
        }

        let images: Images = await imageRepository.getImages(specification)
        let total: number = await imageRepository.countImages(specification)

        res.status(200).json({
          status: Status.Success,
          data: {
            images: ImagesMapper.toJSON(images),
            paging: {
              page: page,
              pages: Math.ceil(total / limit),
              limit: limit,
              total: total
            }
          }
        }).end()
      } catch (err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get images'
        }).end()
      }
    })

    router.post(
      '/images',
      Middleware.authentication,
      async (req: Request, res: Response) => {
      if (res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end();
      }

      upload(req, res, async (err) => {
        if (err) {
          console.error(err)

          res.status(500).json({
            status: Status.Error,
            message: 'failed to create an image'
          }).end()
        }

        let files = req.files as {[fieldname: string]: Express.Multer.File[]};
        let image: Image = new Image(
          new ImageURL(
            process.env.BASE_URL + '/static/images/original/' + files['original'][0].filename,
            process.env.BASE_URL + '/static/images/thumbnail/' + files['thumbnail'][0].filename
          ),
          req.body.alt,
          new Dimension(Number(req.body.height), Number(req.body.width)),
          res.locals.user.email
        )

        await imageRepository.saveImage(image)

        res.status(200).json({
          status: Status.Success,
          data: ImageMapper.toJSON(image)
        }).end()
      })
    })

    router.get('/images/:id', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let image: Image = await imageRepository.getImage(req.params.id)

        res.status(200).json({
          status: Status.Success,
          data: ImageMapper.toJSON(image)
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to get an image'
        }).end()
      }
    })

    router.put('/images/:id', Middleware.authentication, async (req: Request, res: Response) => {
      try {
        let email: Email = new Email(res.locals.user.email)

        await imageService.updateImage(email, req.params.id, req.body.alt)

        res.status(200).json({
          status: Status.Success,
        }).end()
      } catch(err) {
        console.error(err)

        res.status(500).json({
          status: Status.Error,
          message: 'failed to update an image'
        }).end()
      }
    })

    return router
  }
}