import { Request, Response, Router } from "express";

export default (): Router => {
	const router = Router();

	router.use((req: Request, res: Response) => {
    res.status(404).json({
      status: "error",
      message: "Page Not Found",
      data: {
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
      }
    })
  });

	return router;
};
