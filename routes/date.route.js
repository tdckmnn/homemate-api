module.exports = (app) => {
    const date = require("../controllers/date.controller.js");
    const auth = require("../controllers/token.controller.js");

    //Create a new property (with name)
    app.post('/date', auth, date.createDate);

    // Login with credentials
    //app.post('/auth/signin', auth.signInWithEmail);

    //Refresh the user token with the refresh token -> will response new access token and refresh token
    //app.get("/auth/refreshToken", auth, auth.getRefreshToken);
}