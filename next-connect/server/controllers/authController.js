const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

exports.validateSignup = (req, res, next) => {
    req.sanitizeBody('name');
    req.sanitizeBody('email');
    req.sanitizeBody('password');

    // Name is non-null and is 4 to 10 characters
    req.checkBody('name', 'Enter a name').notEmpty();
    req.checkBody('name', 'Name must be between 4 and 10 characters')
        .isLength({ min: 4, max: 10});

    // Email is non-null, valid and normalized
    req.checkBody('email', 'Enter a valid email')
        .isEmail()
        .normalizeEmail()

    //
    req.checkBody('password', 'Enter a password').notEmpty();
    req.checkBody('password', 'Password must be between 4 and 10 characters')
        .isLength({ min: 4, max: 10});
    
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).send(firstError);
    }

    next();
};

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await new User({ name, email, password });

    await User.register(user, password, (err, usr) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.json(usr);
    })
};

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (!user) {
            return res.status(400).json(info.message);
        }

        req.logIn(user, err => {
            if (err) {
                return res.status(500).json(err.message);
            }

            res.json(user);
        })
    })(req, res, next);
};

exports.signout = () => {};

exports.checkAuth = () => {};