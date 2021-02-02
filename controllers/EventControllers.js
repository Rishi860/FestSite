const Functions = require('../models/Functions')

exports.create = async function(req, res){
    try {
        // console.log(req.body)
        const payload = req.body
        const newFunction = await Functions.create(payload)
        // console.log('final')
        // console.log(newFunction)
        return res.status(200).json({
            newFunction
        });

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.update = async function(req, res){
    try {
        // console.log(req.body)
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
        // console.log('skjfd')
        const _id = req.params.id;
        // console.log(eId)
        await Functions.findOne({_id}, function(err, doc){
            if(err){
                console.log(err)
                res.send('Event not found')
            } else {
                // console.log(doc)
                res.render('eventEdit',{title:'Event Edit', data:doc})
            }
        })
        // console.log(result);
        // res.render('eventEdit', {data:result})
        // res.redirect(res.redirect(url.format({
        //     pathname:"/edit",
        //     query: {
        //        "id": eId,
        //      }
        //   })))
        // const token = await userService.login(payload);
        // console.log('out from login',token)
        // // return {success: true,token}
        // res.send('working');

    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}

exports.getEvent = async function(req, res){
    try {
        await Functions.find({},function(err, result){
            if(err){
                console.log(err)
                res.send('Databse is empty')
            } else {
                res.render('catalog',{data:result})
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
                res.redirect('/admin/catalog')
            }
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: `${error}` });
    }
}