const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const passport = require('passport');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.send({ message: "User Route" });
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        let { name, email, password, passwordCheck } = req.body;

        // validate
        if (!name || !email || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
        return res
            .status(400)
            .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordCheck)
        return res
            .status(400)
            .json({ msg: "Enter the same password twice for verification." });

        // Check for existing user
        await User.findOne({ email: req.body.email }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send("User Already exists");
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(201).json({ message: "User Successfully Created." });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate
        if(!email | !password)
        return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({ email: email});
        if(!user)
        return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        return res
        .status(400)
        .json({ msg: "Invalid Log in Credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
        console.log(token);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// // user can delete their own account
// router.delete('/delete', auth, async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.user);
//         res.json(deletedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post("/tokenIsValid", async (req, res) => {
//     try {
//       const token = req.header("x-auth-token");
//       if (!token) return res.json(false);

//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       if (!verified) return res.json(false);

//       const user = await User.findById(verified.id);
//       if (!user) return res.json(false);

//       return res.json(true);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

module.exports = router;