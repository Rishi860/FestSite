const express = require('express')
const router = express.Router();

router.get('/catalog', function(req, res){
    res.render('catalog',{title:'Catalog'})
})

module.exports = router