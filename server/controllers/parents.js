var express = require('express');
var router = express.Router();
var Parent = require('../models/parent');

// Return a list of all parents
router.get('/api/parents', function(req, res, next) {
    Parent.find(function(err, parents) {
        if (err) { return next(err); }
        res.json({'parents': parents});
    });
});

// Create a new parent
router.post('/api/parents', function(req, res, next) {
    var parent = new Parent(req.body);
    parent.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(parent);
    });
});

// Return the parent with the given ID
router.get('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) { return next(err); }
        if (parent === null) {
            return res.status(404).json({'message': 'Parent not found'});
        }
        res.json(parent);
    });
});

// Delete the parent with the given ID
router.delete('/api/parents/:parentnt_id', function(req, res, next) {
    var id = req.params.id;
    Parent.findOneAndDelete({_id: id}, function(err, parent) {
        if (err) { return next(err); }
        if (parent === null) {
            return res.status(404).json({'message': 'Parent not found'});
        }
        res.json(parent);
    });
});

// Update the parent with given ID
router.put('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) {return next(err); }
        if (parent === null) {
            return res.status(404).json({"message" : "Parent not found"});
        }
        parent.username         = req.body.username;
        parent.parent_password = req.body.parent_password;
        parent.parent_password  = req.body.parent_password;
        parent.balance          = req.body.balance;
        parent.save();
        res.json(parent);
    });
});

// Partially update parent with given ID
router.patch('/api/parents/:parent_id', function(req, res, next) {
    var id = req.params.parent_id;
    Parent.findById(id, function(err, parent) {
        if (err) {return next(err); }
        if (parent === null) {
            return res.status(404).json({"message" : "Parent not found"});
        }
        parent.username         = ( req.body.username         || parent.username );
        parent.parent_password = ( req.body.parent_password || parent.parent_password );
        parent.parent_password  = ( req.body.parent_password  || parent.parent_password );
        parent.balance          = ( req.body.balance          || parent.balance );
        parent.save();
        res.json(parent);
    });
});

module.exports = router;