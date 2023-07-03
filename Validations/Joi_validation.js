const Joi = require('joi');
const { Schema } = require('mongoose');

module.exports.userSchema=(str)=>{

    Schemas=Joi.object({
    name:Joi.string()
    .required()
    .trim()
    .messages({
        'string.base': `"name" should be a "text"`,
        'string.empty': `"name" cannot be empty`,
        'any.required': `This field is required`
    }),
    phone:Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^((\+234)+|0)[7-9]{1}[0-9]{9}$/))
    .messages({
        'string.pattern.base': `Invalid phone number`,
        'any.required':'phone Number must not be empty',
    }),

    email:Joi.string()
    .trim()
    .email()
    .required()
    .messages({
        'string.email': `Invalid email, for instance 'example@gmail.com'`,
        'any.required': `this field is require`,
        'string.empty': `"email" cannot be empty field`,
    }),
    password : Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/))
    .messages({
        'string.pattern.base': `'Passwords' must contain atleast one capital letter and one special characters`,
        'any.required': `This field is required`,
        'string.min': `"password" length must at least be 8 characters long`
    }),
    // repeat_password: Joi.ref('password'),
    

    access_token:[
        Joi.string(),
        Joi.number()
    ]

})
.xor('password', 'access_token')
// .with('password', 'repeat_password');

    return Schemas.validate(str)
}

module.exports.productSchema=(str)=>{

    Schemas=Joi.object({
    Name:Joi.string()
    .required()
    .trim()
    .messages({
        'string.base': `"name" should be a "text"`,
        'string.empty': `"name" cannot be empty`,
        'any.required': `This field is required`
    }),
    Quantity:Joi.number()
    .required()
    .messages({
        'number.base': `"Quantity" should be a "number"`,
        'number.empty': `"Quantity" cannot be empty`,
        'any.required': `This field is required`
    }),
    PricePerUnit:Joi.number()
    .positive()
    .required()
    .messages({
        'number.base': `"Price Per Unit" should be a "number"`,
        'number.empty': `"Price" cannot be empty`,
        'any.required': `This field is required`,
        'number.positive': `{{#label}} must be positive`
    }),
    Description:Joi.string()
    .allow('')
})

return Schemas.validate(str)
}


module.exports.loginSchema=(data)=>{
    Schemas = Joi.object({
        email : Joi.string()
        .email()
        .required()
        .trim()
        .messages({
            'string.email': `Invalid email, for instance 'example@gmail.com'`,
            'any.required': `this field is require`,
            'string.empty': `"email" cannot be empty field`,
        }),
        password : Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': `This field is required`,
            'string.min': `"password" length must at least be 8 characters long`
        })

    })
    return Schemas.validate(data);
}