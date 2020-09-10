var express = require('express');
var router = express.Router();
var Icon = require('../models/icon');

router.get('/api/icons', function(req, res, next){
    Icon.find(function(err, icon) {
        if (err) { return next(err); }
        res.json({'icons': icons});
    });
});

router.post('/api/icons', function(req, res, next){
    var icon = new Icon(req.body);
    icon.save(function(err){
        if (err) { return next(err);}
        res.status(201).json(icon);
    });

});

router.get('/api/icons/:icon', function(req, res, next){
    var id = req.params.id;
    Icon.findById(id, function (err, icon){
        if (err) {return next(err); }
        if (icon === null) {
           return res.status(404).json({'message': 'Icon not found'}); 
        }
        res.json(icon);
    });
});

router.delete('/api/icons/:icon_id', function(req, res, next){
    var id = req.params.id;
    Icon.findOneAndDelete({_id: id}, function(err, icon) {
        if (err) { return next(err); }
        if (icon === null) {
            return res.status(404).json({'message': 'Icon not found'});
        }
    });

});

module.exports = router;