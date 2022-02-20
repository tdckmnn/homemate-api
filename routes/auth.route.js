module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");

    // Create a new user (email)
    app.post('/auth/signup', auth.signUpWithEmail);

    // Login with credentials
    app.post('/auth/signin', auth.signInWithEmail);

    //Refresh the user token with the refresh token -> will response new access token and refresh token
    //app.get("/auth/refreshToken", auth, auth.getRefreshToken);
}