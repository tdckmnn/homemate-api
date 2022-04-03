const Date = require('../models/date.model');

//signUpWithEmail register a new user
exports.createDate = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {
        const { type, property, timeslots, invitations } = req.body;

        //create user in database
        const date = await Date.create({
            type, property, timeslots, invitations, user_id
        });

        res.status(200).send(date.toJSON());

    } catch (err) {
        console.log(err);
    }
}