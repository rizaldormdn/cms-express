import { Router, Request, Response } from "express";
import Status from "./Status"

export default class Handler {
	public static router(): Router {
		const router: Router = Router();

		router.use('/ping', (_: Request, res: Response) => {
			res
				.status(200)
				.json({
					status: Status.Success
				})
				.end();
		})

		return router
	}
}