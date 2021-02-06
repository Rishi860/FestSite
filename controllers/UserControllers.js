const userService = require('./userService')
const User = require('../models/Users')
const EventControllers = require('./EventControllers')

exports.preRegister = async function(req, res){
    try {
        const payload = req.body
        const token = await userService.register(payload)
        return res.status(200).json({
            success: true,
            token,
        });

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.preLogin = async function(req, res){
    try {
        const payload = req.body;
        const token = await userService.login(payload);
        res.status(200).json({
            success: true,
            token,
        });

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.userInfo = async function(req, res){
    try {
        const data = await User.findOne({_id:req.params.id},async function(err, doc){
            if (err){
                res.send(`Can not find the user requested for error- ${err}`)
            } else{
                const EventData = await EventControllers.getUserEvents(doc.participantIn)
                res.render('viewUser', {title:'User Details', data: doc, events:EventData})
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.userList = async function(req, res){
    try {
        await User.find({},function(err, doc){
            if(err){
                console.log(err)
                res.send('Databse is empty')
            } else {
                res.render('userHome',{title: 'Admil User Panel', data: doc})
            }
        })
    } catch (error) {
        return res.status(401).json({message: `${error}` });
        
    }
}

exports.eventRegister = async function(req, res){
    try {
        const {token} = req.headers
        const userId = await userService.decodeToken(token)
        await User.updateOne({_id:userId},{
            $addToSet: {participantIn:`${req.params.id}`}
        })
        res.status(200).json({message:'Event Registration Successful'})
    } catch (error) {
        return res.status(401).json({message: `${error}` });
    }
}

exports.eventDreg = async function(req, res){
    try {
        const {userid} = req.headers
        await User.updateOne({_id:userid},{
            $pull: {participantIn:`${req.params.id}`}
        })
        res.status(200).json({message:'Event De-Registration Successful',ok:1})
    } catch (error) {
        return res.status(401).json({message: `${error}`,ok:0});
    }
}