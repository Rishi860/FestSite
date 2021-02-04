const userService = require('./userService')
const User = require('../models/Users')
const EventControllers = require('./EventControllers')

exports.preRegister = async function(req, res){
    try {
        console.log(req.body)
        const payload = req.body
        const token = await userService.register(payload)
        console.log('final')
        console.log(token)
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
        // console.log(req.body)
        const payload = req.body;
        console.log('payload :')
        const token = await userService.login(payload);
        console.log('out from login',token)
        // return {success: true,token}
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
                console.log(err)
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
        return res.status(401).json({ success: false, message: `${error}` });
        
    }
}