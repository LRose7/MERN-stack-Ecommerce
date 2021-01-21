const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils.js');

router.get('/', (req, res) => {
    res.send({ message: "User Route" });
});

// Register a new user
router.post('/register', async (req, res) => {
    // let { name, email, password, confirmPassword } = req.body;

    // validate
    // if (!name || !email || !password || !confirmPassword)
    // return res.status(400).json({ msg: "Not all fields have been entered." });
    // if (password.length < 5)
    // return res
    //     .status(400)
    //     .json({ msg: "The password needs to be at least 5 characters long." });
    // if (password !== confirmPassword)
    // return res
    //     .status(400)
    //     .json({ msg: "Enter the same password twice for verification." });
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        const newUser = await user.save();
        if (newUser) {
          res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),
          });
        } else {
          res.status(401).send({ message: 'Invalid User Data.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

  });

// Login a user
router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    //validate
    if(!email | !password)
    return res
    .status(400)
    .json({ msg: "Not all fields have been entered." });

    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user)
        return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
        if(user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" });
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