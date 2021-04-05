const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const HASH_SALT_ROUNDS = 12;

exports.register = async function (user){
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
}

exports.login = async function (user) {
    try {
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

        if (!userDoc) {
            throw new Error("The email or password are incorrect");
        }

        const passwordsMatch = await bcrypt.compare(password, userDoc.password);

        if (!passwordsMatch) {
            throw new Error("The email or password are incorrect");
        }

        const token = this.createToken(userDoc._id)
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
        const {token} = req.headers
        jwt.verify(token, 'secret_key')
        res.status(200).json({success:true,login:true})
    } catch (error) {
        let e = new Error('Invalid Token')
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.decodeToken = function(token){
    const decoded = jwt.verify(token, 'secret_key');  
    var userId = decoded.user_id
    return userId
}

exports.loginState = async function(req, res){
    let payload = {
        login:false,
        role:'student'
    }
    try {
        const {token}  = req.headers;
        if(token){
            const {user_id} = jwt.verify(token,'secret_key');
            let {role, _id} = await User.findOne({_id:user_id})
            payload = {
                login: true,
                role,
                id: _id,
            }
        }
        res.send(payload)
    } catch (error) {
        return res.send(payload);
    }
}