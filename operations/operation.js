const path = require('path');
const httpErrors = require('http-errors');
const fs = require('fs');
const collecion = require('../models/pizza.model');
const firebase = require('../config/firebase');  // reference to our db 
const firestore = firebase.firestore(); // if using firestore
require("firebase/storage"); // must be required for this to work
const storage = firebase.storage().ref(); // create a reference to storage

async function AddPizza(req, res, next) {
    let size = req.body.size;
    let price = req.body.price;
    let name = req.body.name;
    let imageFileName = req.files.pizza_img.name;
    const image = req.files.pizza_img;

    // Step 1. Create reference for file name in cloud storage 
    const imageRef = storage.child(imageFileName);
    // Step 2. Upload the file in the bucket storage
    const snapshot = await imageRef.put(image.data, {
        contentType: image.mimetype
    });
    // Step 3. Grab the public url
    const downloadURL = await snapshot.ref.getDownloadURL();
    if (downloadURL) {
        const pizza = await collecion.create({
            name: name,
            size: size,
            img_path: downloadURL,
            price: price
        });
        if (pizza) {
            res.status(201).json({
                "New Pizza added": {
                    "name": pizza.name,
                    "size": pizza.size,
                    "price": pizza.price
                }
            })
        } else {
            next(httpErrors.InternalServerError());
        }
    } else {
        next(httpErrors.InternalServerError());
    }
}
async function GetPizza(req, res, next) {
    let id = req.params.id;
    let pizza = await collecion.find({ _id: id })
    if (pizza.length === 0) {
        reject(httpErrors.NotFound());
    } else {
        res.status(200).send(pizza);
    }
}
async function GetAllPizza(req, res, next) {
    let page = req.query.page || 0;
    let limit = req.query.limit || 0;
    let skipCount = (page * limit) - limit;
    let pizza = await collecion.find().skip(skipCount).limit(limit);

    if (pizza.length === 0) {
        next(httpErrors.NotFound());
    } else {
        res.status(200).send(pizza);
    }
}
async function GetAllPizzaByID(req, res, next) {
    let data = req.body;
    const records = await collecion.find({
        '_id': {
            $in: data
        }
    });
    if (records) {
        res.status(200).json(records)
    } else {
        next(httpErrors.BadRequest());
    }

}

module.exports = { AddPizza, GetAllPizza, GetPizza, GetAllPizzaByID }
