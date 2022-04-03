const User = require('../models/user.model.js');

//dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signUpWithEmail register a new user
exports.signUpWithEmail = async (req, res) => {

    try {
        const { username, email, password, type } = req.body;

        //check required fields
        if (!(username && email && password)) {
            res.status(400).send("All input is required");
        }

        //check if existing user
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(400).send("Bad request");
        }

        //encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        //create user in database
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            type
        });

        //create token
        const accessToken = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        //save user token
        user.accessToken = accessToken;

        res.status(201).send(user.toJSON());

    } catch (err) {
        console.log(err);
    }
}

exports.signInWithEmail = async (req, res) => {

    try {

        //get user input
        const { email, password } = req.body;

        //validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        //get user information
        const user = await User.findOne({ email }).select('+password');

        //check if input and user password is the same
        if (user && (await bcrypt.compare(password, user.password))) {

            //create accessToken
            const accessToken = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            //user
            return res.status(200).send({ "accessToken": accessToken, "refreshToken": accessToken })
        };
        res.status(403).send("Access Denied");
    } catch (err) {
        console.log(err);
    }
}

exports.getCurrentUser = async (req, res) => {

    //get userid from auth handler
    const userId = req.userId;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(403).send("Access Denied");
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.getRefreshToken = async (req, res) => {

}