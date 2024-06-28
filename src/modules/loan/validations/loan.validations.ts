import Joi from "joi"
export const loanBookSchema=Joi.object({
	body:{
		bookId: Joi.string().required(),
        userId:Joi.string().required(),
        dueDate:Joi.date().required(),
	},
	params: {},
	query: {},
})
