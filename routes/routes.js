const express = require('express');
const router = express.Router();
const operation = require('../operations/operation');
const { validation } = require('../utils/validate');
const { addPizza, getPizza, getImage, getPizzaByArrayId } = require('../validations/joi.validation');


router.get('/api/products/', operation.GetAllPizza);
router.post('/api/products/add', validation(addPizza, 'body'), operation.AddPizza);
router.get('/product/:id', validation(getPizza, 'params'), operation.GetPizza);
router.post('/products', validation(getPizzaByArrayId, 'body'), operation.GetAllPizzaByID);


module.exports = router;