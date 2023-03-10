require("dotenv").config();
import { Router, Request, Response } from "express"
import Content from "../../article/domain/valueobject/Content";
import Slug from "../../article/domain/valueobject/Slug";
import Image from "../../image/domain/entity/Image";
import ImageRepository from "../../image/domain/repository/ImageRepository"
import Middleware from "../../Middleware";
import Specification from "../../Specification";
import Status from "../../Status"
import Author from "../../user/domain/entity/Author";
import Email from "../../user/domain/valueobject/Email";
import Name from "../../user/domain/valueobject/Name";
import Program from "../domain/aggregate/Program";
import ProgramRepository from "../domain/repository/ProgramRepository"
import ProgramService from "../domain/service/ProgramService";
import { ProgramSnapshots } from "../domain/valueobject/ProgramSnapshot"
import ProgramMapper, { ProgramSnapshotMapper } from "./ProgramMapper"

export default class ProgramHandler {
  public static router(
    imageRepository: ImageRepository,
    programRepository: ProgramRepository,
    programService: ProgramService
  ): Router {
    const router: Router = Router()

    router.get('/featured-program', async (_: Request, res: Response) => {
      try {
        let featuredProgram: ProgramSnapshots = await programRepository.getFeaturedProgram()
        res.status(200).json({
          status: Status.Success,
          data: ProgramSnapshotMapper.toJSON(featuredProgram)
        }).end()
      } catch (error) {
        res.status(500).json({
          status: Status.Error,
          message: "failed to get featured program"
        })
      }
    })

    router.get('/program', async (req: Request, res: Response) => {
      let page = Number(req.query.page ?? 1)
      let limit = Number(process.env.LIMIT_PROGRAM)
      let specification: Specification = new Specification(String(req.query.search ?? ''), page)

      let program: ProgramSnapshots = await programRepository.getPrograms(specification)
      let total: number = await programRepository.countProgram(specification)

      res.status(200).json({
        status: Status.Success,
        data: {
          program: ProgramSnapshotMapper.toJSON(program)
        },
        paging: {
          page: page,
          pages: Math.ceil(total / limit),
          limit: limit,
          total: total
        }
      })
    })

    router.get('/program/:slug', async (req: Request, res: Response) => {
      try {
        let slug: Slug = new Slug().rebuild(req.params.slug)
        let program: Program = await programRepository.getProgram(slug)

        res.status(200).json({
          status: Status.Success,
          data: ProgramMapper.toJSON(program)
        }).end()
      } catch (error) {
        res.status(500).json({
          status: Status.Error,
          message: "failed to get an program"
        })
      }
    })

    router.post('/program', Middleware.authentication, async (req: Request, res: Response) => {
      if (res.locals.user.is_administrator) {
        res.status(403).json({
          status: Status.Error
        }).end()
      }

      try {
        let email: Email = new Email(res.locals.user)
        let name: Name = new Name(res.locals.user.first_name, res.locals.last_name)
        let author: Author = new Author(email, name)
        let content: Content = new Content(req.body.title, req.body.content, req.body.excerpt)
        // let image: Image = await imageRepository.getImage(req.body.image_id)

        // let program: Program = await programService.addProgram(author, content, image)

        res.status(200).json({
          status: Status.Success,
          // data: ProgramMapper.toJSON(program)
        })
      } catch (error) {
        console.error(error)

        res.status(500).json({
          status: Status.Error,
          message: "failed to create an program"
        })

      }
    })
    return router
  }
}