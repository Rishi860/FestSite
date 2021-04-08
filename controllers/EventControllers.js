const Functions = require('../models/Functions')

exports.create = async function(req, res){
    try {
        const payload = req.body
        const newFunction = await Functions.create(payload)
        return res.status(200).json({
            newFunction,
            success: true,
        });

    } catch (error) {
        
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.update = async function(req, res){
    try {
        const payload = req.body
        const updateSuccess= await Functions.findOneAndUpdate({_id: req.body._id}, payload)
        if(updateSuccess){
            res.json({
                success: true
            })
        } else {
            res.send('Server encounterd a error while updating')
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.editEvent = async function(req, res){
    try {
        const _id = req.params.id;
        await Functions.findOne({_id}, function(err, doc){
            if(err){
                console.log(err)
                res.send('Event not found')
            } else {
                res.render('eventEdit',{title:'Event Edit', data:doc})
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.getEvent = async function(req, res){
    try {
        await Functions.find({},function(err, result){
            if(err){
                console.log(err)
                res.render('catalog',{data:0})
            } else {
                res.render('catalog',{data:result})
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.getAdminEvent = async function(req, res){
    try {
        await Functions.find({},function(err, result){
            if(err){
                console.log(err)
                res.send('Databse is empty')
            } else {
                res.render('adminCatalog',{data:result})
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.delete = async function(req, res){
    try {
        await Functions.deleteOne({_id: req.params.id},function(err, result){
            if(err){
                console.log(err)
                res.send(`Can't be deleted error- ${err}`)
            } else {
                res.json({ success: true })
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.getUserEvents = async function(ids){
    try {
        return await Functions.find({
                _id: { $in: ids}
            },function(err, doc){
                if(err){
                    console.log(err)
                    res.send(`Something wrong happened- ${err}`)
                }
            })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}