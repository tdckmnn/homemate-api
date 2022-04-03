module.exports = (app) => {
    const date = require("../controllers/date.controller.js");
    const auth = require("../controllers/token.controller.js");

    //Create a new property (with name)
    app.post('/date', auth, date.createDate);

    //Create a new property (with name)
    app.get('/date', auth, date.getAllDates);

    //Book Timeslot
    app.put('/date/:id/:timeslot', auth, date.bookTimeslot);

    //Refresh the user token with the refresh token -> will response new access token and refresh token
    //app.get("/auth/refreshToken", auth, auth.getRefreshToken);
}