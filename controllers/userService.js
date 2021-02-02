const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const HASH_SALT_ROUNDS = 12;

exports.register = async function (user){
    console.log('register in')
    const {name, email, password} = user;
    const userDoc = await User.findOne({
        email
    });
    if(userDoc){
        throw new Error('Email Id Alerady exists!');
    }
    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS)

    const count = await User.countDocuments({});
    const newUser = {
        name,
        email,
        password: hashedPassword,
        // first user is admin
        role: count ===0 ? "admin":"student"
    }

    const result = await User.create(newUser)
    return result
    // res.send(newUser)
    // console.log('done')
}

exports.login = async function (user) {
    try {
        console.log('login in')
        const {email, password} = user;
        if (!email || !password) {
            throw new Error("One or more required fields are empty.");
        }
        const emailRegex = new RegExp(`\\b${email}\\b`, "i");
        const userDoc = await User.findOne({
            email: {
            $regex: emailRegex,
            },
        });
        console.log('user exist')

        if (!userDoc) {
            throw new Error("The email or password are incorrect");
        }

        const passwordsMatch = await bcrypt.compare(password, userDoc.password);
        console.log('pass compared')

        if (!passwordsMatch) {
            console.log('entering red zone')
            throw new Error("The email or password are incorrect");
        }

        const token = this.createToken(userDoc._id)
        console.log('token')
        return token;
    } catch (error) {
        console.log(error)
    }
}

exports.createToken = async function (user_id) {
    return jwt.sign(
        {
            user_id,
        },
        'secret_key', // process.env.SECRET_KEY
        {
            expiresIn: "20d",
        }
    );
}

exports.verifytoken = async function(req, res, next){
    try {
        // console.log(req.body)
        const token = localStorage.getItem('token')
        console.log(req.headers)
        const payload = req.headers.token;
        console.log('verifying :')
        jwt.verify(payload, 'secret_key')
        console.log('Success')
        next();
        // return {success: true,token}

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}
