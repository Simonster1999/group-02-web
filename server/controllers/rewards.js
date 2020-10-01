var express = require('express');
var router = express.Router();
var Reward = require('../models/reward');

// Create a reward
router.post('/api/rewards', function(req, res, next){
    var reward = new Reward(req.body);
    reward.save(function(err){
        if (err) { 
            return res.status(400).json({'message': 'Bad request'});
        }
        res.status(201).json(reward);
    });
});

// Create a reward belonging to parent
router.post('/api/parents/:parent_id/rewards', function(req, res, next) {
    var parent_id = req.params.parent_id;
    var reward = new Reward(req.body);
    reward.save(function(err) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward.parent != parent_id) {
            return res.status(400).json({'message': 'Reward does not belong to this parent'});
        }
        res.status(201).json(reward);
    });
});

// Get all rewards
router.get('/api/rewards', function(req, res, next){
    Reward.find(function(err, reward) {
        if (err) { return next(err); }
        res.json({'rewards': reward});
    });
});

// Get the reward with the given id
router.get('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.reward_id;
    Reward.findById(id, function (err, reward){
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json(reward);
    });
});

// Get all rewards belonging to a parent
router.get('/api/parents/:parent_id/rewards/', function(req, res, next){
    var id = req.params.parent_id;
    Reward.find({parent: id}, function (err, rewards){
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (rewards === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        res.json({'rewards':rewards});
    });
});

// Get a parents reward with the given id
router.get('/api/parents/:parent_id/rewards/:reward_id', function(req, res, next){
    var parent_id = req.params.parent_id;
    var id = req.params.reward_id;
    Reward.findById(id, function (err, reward){
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward === null) {
           return res.status(404).json({'message': 'Reward not found'}); 
        }
        if (reward.parent != parent_id) {
            return res.status(400).json({'message': 'Reward does not belong to this parent'});
        }
        res.json(reward);
    });
});

//Check parent exists or throw error "parent does not exist"
// Replace a reward
router.put('/api/rewards/:reward_id', function(req, res, next) {
    var id = req.params.reward_id;
    Reward.findById(id, function(err, reward) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
        reward.reward_name = req.body.reward_name;
        reward.reward_desc = req.body.reward_desc;
        reward.is_bought   = req.body.is_bought;
        reward.price       = req.body.price;
        reward.parent      = req.body.parent;
        reward.bought_by   = req.body.bought_by;
        reward.save(function(err, reward) {
            if (err) {
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(reward);
            }
        });
    });
});

// Partially replace reward
router.patch('/api/rewards/:reward_id', function(req, res, next) {
    var id = req.params.reward_id;
    Reward.findById(id, function(err, reward) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
        reward.reward_name = (req.body.reward_name || reward.reward_name);
        reward.reward_desc = (req.body.reward_desc || reward.reward_desc);
        reward.is_bought   = (req.body.is_bought   || reward.is_bought);
        reward.price       = (req.body.price       || reward.price);
        reward.parent      = (req.body.parent      || reward.parent);
        reward.bought_by   = (req.body.bought_by   || reward.bought_by);
        reward.save(function(err, reward) {
            if (err) {
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(reward);
            }
        });
    });
});

// Delete All Rewards
router.delete('/api/rewards', function(req, res, next) {
    Reward.deleteMany({}, function(err, result){
        if (err) { return next(err); }
        if (result.n === 0) { 
            return res.status(404).json({'message': 'No Rewards Found'});
        }
        res.json(result);
    }); 
});

// Delete a reward
router.delete('/api/rewards/:reward_id', function(req, res, next){
    var id = req.params.reward_id;
    Reward.findOneAndDelete({_id: id}, function(err, reward) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (reward === null) {
            return res.status(404).json({'message': 'Reward not found'});
        }
        res.json(reward);
    });
});

module.exports = router;