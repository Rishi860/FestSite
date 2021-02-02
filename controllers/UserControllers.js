const userService = require('./userService')

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
