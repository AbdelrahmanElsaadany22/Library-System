import Joi from "joi"

export const addPurchaseSchema=Joi.object({
	body:{
		userId: Joi.string().required(),
        bookId: Joi.string().required(),
        quantity: Joi.number().required(),
        totalAmount: Joi.number().required(),
	},
	params: {},
	query: {},
})