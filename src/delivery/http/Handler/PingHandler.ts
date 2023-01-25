import { Request, Response, Router } from "express";

export default (): Router => {
	const router = Router();

	router.get("/ping", (req: Request, res: Response) => {
		try {
			res
				.status(200)
				.json({
					status: "success",
					message: "Server is alive",
					data: {
						method: req.method,
						url: req.url,
					},
				})
				.end();
		} catch (error) {
			res
				.status(500)
				.json({
					status: "success",
					message: "Server is alive",
					data: {
						method: req.method,
						url: req.url,
						body: req.body
					},
				})
				.end();
		}
	});
	router.post("/ping", (req: Request, res: Response) => {
		try {
			res
				.status(200)
				.json({
					status: "success",
					message: "Server is alive",
					data: {
						method: req.method,
						url: req.url,
						body: req.body
					},
				})
				.end();
		} catch (error) {
			res
				.status(500)
				.json({
					status: "success",
					message: "Server is alive",
					data: {
						method: req.method,
						url: req.url,
						body: req.body
					},
				})
				.end();
		}
	});

	return router;
};
