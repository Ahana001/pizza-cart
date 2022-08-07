const Joi = require('joi');
const addPizza = Joi.object({
    size: Joi.string().required().valid('small', 'medium', 'large'),
    price: Joi.number().integer().required(),
    name: Joi.string().required(),
});

const getPizza = Joi.object({
    id: Joi.string().required()
});

const getPizzaByArrayId = Joi.array().required();

module.exports = { addPizza, getPizza, getPizzaByArrayId };
