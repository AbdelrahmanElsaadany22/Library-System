import { Schema } from "joi"; 
import { AppError } from "../utils/error.handler"
import { NextFunction, Request, Response } from "express";
export const validate = (schema:Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(
			{
				body: req.body,
				params: req.params,
				query: req.query,
			},
			{ abortEarly: false }
		)
		if (error) {
			throw new AppError(
				error.details.map((d) => d.message).join(', '),400
			)
		}
		next()
	}
}