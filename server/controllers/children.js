var express = require('express');
var router = express.Router();
var Child = require('../models/child');
var Quest = require('../models/quest');
var Reward = require('../models/reward');

// Return a list of all children
router.get('/api/children', function(req, res, next) {
    Child.find(function(err, children) {
        if (err) { return next(err); }
        res.json({'children': children});
    });
});

// Create a new child
router.post('/api/children', function(req, res, next) {
    var child = new Child(req.body);
    child.save(function(err) {
        if (err) { return res.status(400).json({'message': 'Bad Request'}); }
        res.status(201).json(child);
    });
});

// Return the child with the given ID
router.get('/api/children/:child_id', function(req, res, next) {
    var id = req.params.child_id;
    Child.findById(id, function(err, child) {
        if (err) { return next(err); }
        if (child === null) {
            return res.status(404).json({'message': 'Child not found'});
        }
        res.json(child);
    });
});

// Get all children belonging to a parent
router.get('/api/parents/:parent_id/children', function(req, res, next){
    var id = req.params.parent_id;
    Child.find({parent: id}, function (err, children){
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (children === null) {
           return res.status(404).json({'message': 'Child not found'}); 
        }
        res.json({'children': children});
    });
});

// Delete the child with the given ID
router.delete('/api/children/:child_id', function(req, res, next) {
    var id = req.params.child_id;
    Quest.deleteMany({completed_by: id}, function(err) {});
    Reward.deleteMany({bought_by: id}, function(err) {});
    Child.findOneAndDelete({_id: id}, function(err, child) {
        if (err) { return next(err); }
        if (child === null) {
            return res.status(404).json({'message': 'Child not found'});
        }
        res.json(child);
    });
});

// Delete all children
router.delete('/api/children', function(req, res, next) {
    Quest.deleteMany({is_completed: 'true'}, function(err) {});
    Reward.deleteMany({is_bought: 'true'}, function(err) {});
    Child.deleteMany({}, function(err, result){
        if (err) { return next(err); }
        if (result.n === 0) { 
            return res.status(404).json({'message': 'No Children Found'});
        }
        res.json(result);
    }); 
});

// Update the child with given ID
router.put('/api/children/:child_id', function(req, res, next) {
    var id = req.params.child_id;
    Child.findById(id, function(err, child) {
        if (err) {return next(err); }
        if (child === null) {
            return res.status(404).json({"message" : "Child not found"});
        }
        child.username = req.body.username;
        child.password = req.body.password;
        child.balance  = req.body.balance;
        child.save(function (err, child){
            if (err){
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(child)
            }
        });
    });
});

// Partially update child with given ID
router.patch('/api/children/:child_id', function(req, res, next) {
    var id = req.params.child_id;
    Child.findById(id, function(err, child) {
        if (err) {return next(err); }
        if (child === null) {
            return res.status(404).json({"message" : "Child not found"});
        }
        child.username = ( req.body.username || child.username );
        child.password = ( req.body.password || child.password );
        child.balance  = ( req.body.balance  || child.balance );
        child.save(function (err, child){
            if(err){
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(child);
            }
        });
    });
});

module.exports = router;