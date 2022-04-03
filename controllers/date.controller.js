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

exports.getAllDates = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {

        const dates = await Date.find({ user_id: user_id }).populate({ path: "property" })

        if (!dates.length) {
            return res.status(204).json(dates);
        }

        res.status(200).json(dates);
    } catch (err) {
        console.log(err);
    }
}

exports.bookTimeslot = async (req, res) => {

    //get userid from auth handler
    const user_id = req.userId;

    try {
        //get id from request path (GET: /property/{id})
        const date_id = req.params.id;
        const timeslot_id = req.params.timeslot;
        const { status } = req.body;

        //const date = await Date.findOne({ user_id: user_id, _id: date_id })

        await Date.findOneAndUpdate(
            { _id: date_id, "timeslots._id": timeslot_id }, // filter arguments
            // update data
            { $set: { "timeslots.$.status": status, "timeslots.$.bookedBy": user_id } },
            //options
            {
                //bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
                new: true
            }
        ).then(result => {

            //check if result is null
            if (!result) {
                return res.status(400).json({ "message": "Bad Request" });
            }

            //return updated project
            res.status(200).json(result);
        }).catch(error => {
            console.log(error);
        })
    } catch (err) {
        console.log(err);
    }
}