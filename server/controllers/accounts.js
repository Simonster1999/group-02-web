var express = require('express');
var router = express.Router();
var Account = require('../models/account');

// Return a list of all accounts
router.get('/api/accounts', function(req, res, next) {
    Account.find(function(err, accounts) {
        if (err) { return next(err); }
        res.json({'accounts': accounts});
    });
});

// Create a new account
router.post('/api/accounts', function(req, res, next) {
    var account = new Account(req.body);
    account.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(account);
    });
});

// Return the account with the given ID
router.get('/api/account/:account_id', function(req, res, next) {
    var id = req.params.account_id;
    Account.findById(id, function(err, account) {
        if (err) { return next(err); }
        if (account === null) {
            return res.status(404).json({'message': 'Account not found'});
        }
        res.json(account);
    });
});

// Delete the account with the given ID
router.delete('/api/accounts/:account_id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, account) {
        if (err) { return next(err); }
        if (account === null) {
            return res.status(404).json({'message': 'Account not found'});
        }
        res.json(account);
    });
});

module.exports = router;