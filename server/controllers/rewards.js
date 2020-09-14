var express = require('express');
var router = express.Router();
var Reward = require('../models/reward');

// Get all rewards
router.get('/api/rewards', function(req, res, next){
    Reward.find(function(err, reward) {
        if (err) { return next(err); }
        res.json({'rewards': reward});
    });
});

// Create a reward
router.post('/api/rewards', function(req, res, next){
    var reward = new Reward(req.body);
    reward.save(function(err){
        if (err) { return next(err);}
        res.status(201).json(reward);
    });

});

// Get the reward with the given id
router.get('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.reward_id;
    Reward.findById(id, function (err, reward){
        if (err) {return next(err); }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json(reward);
    });
});

// Get all rewards belonging to a parent
router.get('/api/parents/:parent_id/rewards/', function(req, res, next){
    var id = req.params.parent_id;
    Reward.find({parent: id}, function (err, reward){
        if (err) {return next(err); }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json(reward);
    });
});

// Get a parents reward with the given id
router.get('/api/parents/:parent_id/rewards/:reward_id', function(req, res, next){
    var id = req.params.reward_id;
    Reward.findById(id, function (err, reward){
        if (err) {return next(err); }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json(reward);
    });
});

// Replace a reward
router.put('/api/rewards/:reward_id', function(req, res, next) {
    var id = req.params.reward_id;
    Reward.findById(id, function(err, reward) {
        if (err) { return next(err); }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
        reward.reward_name = req.body.reward_name;
        reward.reward_desc = req.body.reward_desc;
        reward.is_bought   = req.body.is_bought;
        reward.price       = req.body.price;
        reward.parent      = req.body.parent;
        reward.save();
        res.json(reward);
    });
});

// Partially replace reward
router.patch('/api/rewards/:reward_id', function(req, res, next) {
    var id = req.params.reward_id;
    Reward.findById(id, function(err, reward) {
        if (err) { return next(err); }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
        reward.reward_name = (req.body.reward_name || reward.reward_name);
        reward.reward_desc = (req.body.reward_desc || reward.reward_desc);
        reward.is_bought   = (req.body.is_bought   || reward.is_bought);
        reward.price       = (req.body.price       || reward.price);
        reward.parent      = (req.body.parent      || reward.parent);
        quest.save();
        res.json(quest);
    });
});

// Delete a reward
router.delete('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.reward_id;
    Reward.findOneAndDelete({_id: id}, function(err, reward) {
        if (err) { return next(err); }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
    });
});

module.exports = router;