const Property = require('../models/property.model.js');

//signUpWithEmail register a new user
exports.createProperty = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {
        const { name, adress, details } = req.body;

        //create user in database
        const property = await Property.create({
            name, adress, details, user_id
        });

        res.status(200).send(property.toJSON());

    } catch (err) {
        console.log(err);
    }
}

exports.getAllProperty = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {

        const properies = await Property.find({ user_id: user_id })

        if (!properies.length) {
            return res.status(204).json(properies);
        }

        res.status(200).json(properies);
    } catch (err) {
        console.log(err);
    }
}

exports.getSingleProperty = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {
        //get id from request path (GET: /property/{id})
        const property_id = req.params.id;

        const property = await Property.findOne({ user_id: user_id, _id: property_id })

        if (!property) {
            res.status(204).send("Can not find property with this specific id");
        }

        res.status(200).send(property.toJSON());
    } catch (err) {
        console.log(err);
    }
}