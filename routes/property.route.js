module.exports = (app) => {
    const property = require("../controllers/property.controller.js");
    const auth = require("../controllers/token.controller.js");

    // Create a new property (with name)
    app.post('/property', auth, property.createProperty);

    // Get all property (by user_id (auth))
    app.get('/property', auth, property.getAllProperty);

    // Login with credentials
    //app.post('/auth/signin', auth.signInWithEmail);

    //Refresh the user token with the refresh token -> will response new access token and refresh token
    //app.get("/auth/refreshToken", auth, auth.getRefreshToken);
}