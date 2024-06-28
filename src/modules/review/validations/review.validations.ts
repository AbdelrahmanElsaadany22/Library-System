import Joi from "joi"
export const AddReviewSchema=Joi.object({
	body:{
		bookName: Joi.string().required(),
        userEmail:Joi.string().required(),
        rating:Joi.number().required(),
        comment:Joi.string().required(),
	},
	params: {},
	query: {},
})


export const getReviewsSchema=Joi.object({
	body:{
		name: Joi.string().required(),
	},
	params: {},
	query: {},
})

export const deleteReviewsSchema=Joi.object({
	body:{
		bookName: Joi.string().required(),
        userEmail:Joi.string().required(),
	},
	params: {},
	query: {},
})
