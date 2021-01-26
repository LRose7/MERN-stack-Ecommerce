if(process.env.NODE_ENV = 'production') {
    require('dotenv').config();
}

const express = require ('express');
const mongoose = require ('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

dotenv.config();

// Set up express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, './client/public/uploads')));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
//----------- End of Middleware --------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// Set up mongoose
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
});

// set up routes
app.use('/user', require('./routes/userRoute'));
app.use('/products', require('./routes/productRoute.js'));
app.use('/orders', require('./routes/orderRoute.js'));
app.use('/uploads', require('./routes/uploadRoute'));
