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