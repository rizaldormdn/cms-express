import { Request, Response, Router } from "express";
import CategoryMySQL from "../../../infrastructure/database/CategoryMySQL";
import { CategoryRepository } from "../../../repository/CategoryRepository";
import { body } from "express-validator";
import {
	Result,
	validationResult,
} from "express-validator/src/validation-result";
import { ValidationError } from "express-validator/src/base";
import Category from "../../../entity/Category";
import { param } from "express-validator/src/middlewares/validation-chain-builders";

export default (repository: CategoryRepository): Router => {
	const router: Router = Router();

	router.post(
		"/category",
		body("name").isLength({ min: 1, max: 55 }),
		async (req: Request, res: Response): Promise<void> => {
			// Membuat variable penampung error
			let errors: Result<ValidationError> = validationResult(req);

			// Mengecek apakah terdapat error
			if (!errors.isEmpty()) {
				res
					.status(400)
					.json({
						status: "error",
						message: errors.array(),
					})
					.end();
				return;
			}
			let category: Category = new Category(req.body.name);

			try {
				await repository.saveCategory(category);
				res
					.status(200)
					.json({
						status: "success",
						message: "Category successfully saved",
						data: category,
					})
					.end();
			} catch (error) {
				console.log(error);
				res
					.status(400)
					.json({
						status: "error",
						message: "Cannot save category",
						data: error,
					})
					.end();
			}
		}
	);

	router.post(
		"/category",
		body("uuid").isLength({ min: 3, max: 55 }), // Mengecek apakah body.name memenuhi syarat minimum dan maximum
		async (req: Request, res: Response): Promise<void> => {
			// Membuat variable penampung error
			let errors: Result<ValidationError> = validationResult(req);

			// Mengecek apakah terdapat error
			if (!errors.isEmpty()) {
				res
					.status(400)
					.json({
						status: "error",
						message: errors.array(),
					})
					.end();
				return;
			}

			// let category: Category = new Category(req.body.name);
			let category: Category = await repository.getCategory(req.body.uuid);

			console.log("We got the category: " + category);

			res
				.status(200)
				.json({
					status: "success",
					message: "Category successfully retrieved",
					data: category,
				})
				.end();
		}
	);

	router.get(
		"/category/:uuid",
		param("uuid").isLength({ min: 3, max: 55 }), // Mengecek apakah body.name memenuhi syarat minimum dan maximum
		async (req: Request, res: Response): Promise<void> => {
			// Membuat variable penampung error
			let errors: Result<ValidationError> = validationResult(req);

			// Mengecek apakah terdapat error
			if (!errors.isEmpty()) {
				res
					.status(400)
					.json({
						status: "error",
						message: errors.array(),
					})
					.end();
				return;
			}

			// let category: Category = new Category(req.body.name);
			let category: Category = await repository.getCategory(req.body.uuid);

			console.log("We got the category: " + category);

			res
				.status(200)
				.json({
					status: "success",
					message: "Category successfully retrieved",
					data: category,
				})
				.end();
		}
	);

	return router;
};
