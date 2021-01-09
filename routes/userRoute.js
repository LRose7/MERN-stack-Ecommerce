const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try{
    let { name, email, password, passwordCheck } = req.body;

    // validate
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
    return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    
    const existingUser = await User.findOne({ email: email });
    if(existingUser)
    return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if(!name) name = email;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
        name,
        email,
        password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    
    } catch(err) {
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
        res.json({
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

module.exports = router;