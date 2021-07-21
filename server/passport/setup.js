const bcrypt = require("bcryptjs")
const User = require("../models/Users")
const passport = require("passport")
const LocalStrategy = require("passport-local")

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        //Match User
        User.findOne({ email: email })
            .then(user => {
                //Create new 
                if (!user) {
                    const newUser = new User({ email, password });
                    // Hash password before storing
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    //return other user
                    console.log("Created new User")
                } else {
                    //Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "Wrong Password" })
                        }
                    })
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            })
    })
)

module.exports = passport;