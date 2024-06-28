import Joi from "joi"

export const signupSchema = Joi.object({
	body: {
        name: Joi.string().required(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] },
			})
			.required(),
		password: Joi.string()
			.required(),
        address: Joi.string()
			.required(),
		role:Joi.string().required(),
        age:Joi.number().required()
	},
	params: {},
	query: {},
})

export const signinSchema=Joi.object({
	body:{
		email: Joi.string().required(),
		password: Joi.string().required(),
	},
	params: {},
	query: {},
})