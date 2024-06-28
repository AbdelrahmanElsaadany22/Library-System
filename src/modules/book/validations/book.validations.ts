import Joi from "joi"
export const AddBookSchema=Joi.object({
	body:{
		name: Joi.string().required(),
        author:Joi.string().required(),
        publisher: Joi.string().required(),
        quantity:Joi.number().required(),
		price: Joi.number().required(),
        genre:Joi.string().required(),
        publishedDate:Joi.date(),
        language:Joi.string(),
	},
	params: {},
	query: {},
})


export const getBookByNameSchema=Joi.object({
	body:{
		name: Joi.string().required(),
	},
	params: {},
	query: {},
})
export const getBooksForAuthorSchema=Joi.object({
	body:{
		author: Joi.string().required(),
	},
	params: {},
	query: {},
})
export const deleteBookSchema=Joi.object({
	body:{
		name: Joi.string().required(),
	},
	params: {},
	query: {},
})
export const updateBookSchema=Joi.object({
	body:{
		name: Joi.string().required(),
        author:Joi.string(),
        publisher: Joi.string(),
        quantity:Joi.number(),
        genre:Joi.string(),
        publishedDate:Joi.date(),
        language:Joi.string(),
	},
	params: {},
	query: {},
})
