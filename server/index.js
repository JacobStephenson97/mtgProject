const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose")

const passport = require("./passport/setup")
const auth = require("./routes/auth")

const app = express()
const apiPort = 5000
const MONGO_URI = "mongodb+srv://Jacobstephenson97:root@cluster0.nhwp5.mongodb.net/mtgproject?retryWrites=true&w=majority"

const CardRouter = require('./routes/card-router')

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: MONGO_URI
        })
    })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/card', CardRouter);
app.use('/api/auth', auth);
app.get("/user", (req, res) => {
    res.send(req.user);
    console.log(req.user);
})
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/')
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))