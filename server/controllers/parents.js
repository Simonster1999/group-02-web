var express = require('express');
var router = express.Router();
var Parent = require('../models/parent');
var Child = require('../models/child');
var Quest = require('../models/quest');
var Reward = require('../models/reward');

// Return a list of all parents
router.get('/api/parents', function(req, res, next) {
    Parent.find(function(err, parents) {
        if (err) { return next(err); }
        res.json({'parents': parents});
    });
});

// Create a new parent
router.post('/api/parents', function(req, res) {
    var parent = new Parent(req.body);
    parent.save(function(err) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        res.status(201).json(parent);
    });
});

// Login for parents
router.get('/api/parents/login', function(req, res) {
    var user = req.query.username;
    var pass = req.query.password;
    Parent.findOne({username: user}, function(err, parent) {
        if (err) {
            return res.status(400).json({'message': 'Bad request', 'status': false});
        } else if (parent === null) {
            return res.status(404).json({'message' : 'Parent not found', 'status': false});
        } else if (parent.password === pass) {
            return res.json({'message': 'Login successful', 'status': true, 'id': parent._id});
        } else {
            return res.status(401).json({'message': 'Login failed', 'status': false});
        }
    })
});

// Return the parent with the given ID
router.get('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (parent === null) {
            return res.status(404).json({'message': 'Parent not found'});
        }
        res.json(parent);
    });
});

// Delete the parent with the given ID
router.delete('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Child.deleteMany({parent: id}, function(err) {});
    Quest.deleteMany({parent: id}, function(err) {});
    Reward.deleteMany({parent: id}, function(err) {});
    Parent.findOneAndDelete({_id: id}, function(err, parent) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (parent === null) {
            return res.status(404).json({'message': 'Parent not found'});
        }
        res.json(parent);
    });
});

// Delete all parents
router.delete('/api/parents', function(req, res, next) {
    Child.deleteMany({}, function (err) {});
    Quest.deleteMany({}, function(err) {});
    Reward.deleteMany({}, function(err) {});
    Parent.deleteMany({}, function(err, result){
        if (err) { return next(err); }
        if (result.n === 0) { 
            return res.status(404).json({'message': 'No Parents Found'});
        }
        res.json(result);
    }); 
});

// Update the parent with given ID
router.put('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (parent === null) {
            return res.status(404).json({'message' : 'Parent not found'});
        }
        parent.username = req.body.username;
        parent.password = req.body.password;
        parent.save(function (err, parent){
            if (err){
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(parent)
            }
        });
    });
});

// Partially update parent with given ID
router.patch('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) {
            return res.status(400).json({'message': 'Bad request'});
        }
        if (parent === null) {
            return res.status(404).json({'message' : 'Parent not found'});
        }
        parent.username = ( req.body.username || parent.username );
        parent.password = ( req.body.password || parent.password );
        parent.save(function (err, parent){
            if (err){
                res.status(400).json({'message': 'Bad Request'});
            } else {
                res.json(parent)
            }
        });
    });
});



module.exports = router;