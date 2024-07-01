// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Adjust the path as needed

passport.use(new LocalStrategy(async (email, password, done) => {
    try {
        // console.log('Received credentials:', email, password);
        const user = await Person.findOne({ email });
        if (!user)
            return done(null, false, { message: 'Incorrect email.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export configured passport