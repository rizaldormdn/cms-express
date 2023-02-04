import { Request, Response, Router } from "express";

export default (): Router => {
	const router = Router();

	router.get("/ping", (req: Request, res: Response) => {
		res
			.status(200)
			.json({
				status: "success",
				message: "server is alive",
				data: {
					method: req.method,
					url: req.url,
				},
			})
			.end();
	});

	return router;
};
