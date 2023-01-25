import { Request, Response, Router } from "express";

export default (): Router => {
	const router = Router();

	router.use((req: Request, res: Response) => {
    res.status(404).json({
      status: "error",
      message: "Not Found",
      data: null
    })
  });

	return router;
};
