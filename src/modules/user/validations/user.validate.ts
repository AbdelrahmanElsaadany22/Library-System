import Joi from "joi"

export const getUserSchema=Joi.object({
	body:{
		email: Joi.string().required(),
	},
	params: {},
	query: {},
})

export const getRecommendationsSchema=Joi.object({
	body:{
		userId: Joi.string().required(),
	},
	params: {},
	query: {},
})