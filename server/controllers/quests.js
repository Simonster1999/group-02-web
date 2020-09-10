var express = require('express');
var router = express.Router();
var Quest = require('../models/quest');

// Return a list of all quests
router.get('/api/:quests', function(req, res, next) {
    Quest.find(function(err, quests) {
        if (err) { return next(err); }
        res.json({'quests': quests});
    });
});

// Create a new quest
router.post('/api/:quests', function(req, res, next) {
    var quest = new Quest(req.body);
    quest.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(quest);
    });
});

// Return the quest with the given ID
router.get('/api/quests/:quest_id', function(req, res, next) {
    var id = req.params.id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        res.json(quest);
    });
});

// Delete the quest with the given ID
router.delete('/api/quests/:quest_id', function(req, res, next) {
    var id = req.params.id;
    Quest.findOneAndDelete({_id: id}, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        res.json(quest);
    });
});

//Changes entire entity
router.put('/api/quests/:quest_id', function(req, res, next) {
    var id = req.params.id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        quest.quest_Name = req.body.quest_Name;
        quest.money_Reward = req.body.money_Reward;
        quest.is_Completed = req.body.is_Completed;
        quest.quest_Desc = req.body.quest_Desc;
        quest.date = req.body.date;
        quest.icon = req.body.icon;
        quest.account = req.body.account;
        quest.save();
        res.json(quest);
    });
});

//Changes specified attribute
router.patch('/api/quests/:quest_id', function(req, res, next) {
    var id = req.params.id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        quest.quest_Name = (req.body.quest_Name || quest.quest_Name);
        quest.money_Reward = (req.body.money_Reward || quest.money_Reward);
        quest.is_Completed = (req.body.is_Completed || quest.is_Completed);
        quest.quest_Desc = (req.body.quest_Desc || quest.quest_Desc);
        quest.date = (req.body.date || quest.date);
        quest.icon = (req.body.icon || quest.icon);
        quest.account = (req.body.account || quest.account);
        quest.save();
        res.json(quest);
    });
});

module.exports = router;


