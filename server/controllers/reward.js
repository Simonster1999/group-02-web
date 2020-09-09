var express = require('express');
var router = express.Router();
var Reward = require('../models/reward');

router.get('/api/rewards', function(req, res, next){
    Reward.find(function(err, reward) {
        if (err) { return next(err); }
        res.json({'rewards': rewards});
    });
});

router.post('/api/rewards', function(req, res, next){
    var reward = new Reward(req.body);
    reward.save(function(err){
        if (err) { return next(err);}
        res.status(201).json(reward);
    });

});

router.get('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.id;
    Reward.findById(id, function (err, reward){
        if (err) {return next(err); }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json(reward);
    });
});

router.delete('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.id;
    Reward.findOneAndDelete({_id: id}, function(err, reward) {
        if (err) { return next(err); }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
    });

});

module.exports = router;