const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken, isAuth, isAdmin } = require('../utils.js');

// Register a new user
router.post('/register', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found"});
  }
});

router.put('/profile', isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description =
        req.body.sellerDescription || user.seller.description;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(updatedUser),
    });
  }
});

router.get('/',  isAuth, isAdmin, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});


router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.email === 'admin@example.com') {
          res.status(400).send({ message: "Can Not Delete Admin User" });
          return;
        }
        const deleteUser = await User.remove();
        res.send({ message: "User Deleted", user: deleteUser });
      } else {
        res.status(404).send({ message: "User Not Found" });
      }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.get('/top-sellers', async (req, res) => {
  const topSellers = await User.find({ isSeller: true })
    .sort({ 'seller.rating': -1 })
    .limit(3);
  res.send(topSellers);
});

module.exports = router;