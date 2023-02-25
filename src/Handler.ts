import { Request, Response } from "express";
import Status from "./Status"

export default class Handler {
  public static ping(_: Request, res: Response) {
    res
			.status(200)
			.json({
				status: Status.Success
			})
			.end();
  }
}