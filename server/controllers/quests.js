const { urlencoded } = require('body-parser');
var express = require('express');
var router = express.Router();
var Quest = require('../models/quest');


// Return a list of all quests
router.get('/api/quests', function(req, res, next) {
    Quest.find(function(err, quests) {
        if (err) { return next(err); }
        res.json({'quests': quests});
    });
});

// Create a new quest
router.post('/api/parents/:parent_id/quests', function(req, res, next) {
    var quest = new Quest(req.body);
    quest.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(quest);
    });
});

// Create a new quest for postman testing
router.post('/api/quests', function(req, res, next) {
    var quest = new Quest(req.body);
    quest.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(quest);
    });
});

// Return the quest with the given ID
router.get('/api/quests/:quest_id', function(req, res, next) {
    var id = req.params.quest_id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        res.json(quest);
    });
});

// Return a all quests for the given parent
router.get('/api/parents/:parent_id/quests', function(req, res, next) {
    var id = req.params.parent_id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        res.json(quest);
    });
});

// Return a given quest for the given parent
router.get('/api/parents/:parent_id/quests/:quest_id', function(req, res, next) {
    var id = req.params.quest_id;
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
    var id = req.params.quest_id;
    Quest.findOneAndDelete({_id: id}, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        res.json(quest);
    });
});

// Delete the quest with the given ID for the given parent
router.delete('/api/parents/:parent_id/quests/:quest_id', function(req, res, next) {
    var id = req.params.quest_id;
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
    var id = req.params.quest_id;
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
    var id = req.params.quest_id;
    Quest.findById(id, function(err, quest) {
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': 'Quest not found'});
        }
        quest.quest_Name    = (req.body.quest_Name || quest.quest_Name);
        quest.money_Reward  = (req.body.money_Reward || quest.money_Reward);
        quest.is_Completed  = (req.body.is_Completed || quest.is_Completed);
        quest.quest_Desc    = (req.body.quest_Desc || quest.quest_Desc);
        quest.date          = (req.body.date || quest.date);
        quest.icon          = (req.body.icon || quest.icon);
        quest.account       = (req.body.account || quest.account);
        quest.save();
        res.json(quest);
    });
});

//TODO: 
//Displays uncompleted quests by filtering out completed ones. 
/* router.get('/api/quests/:quest_id?is_Completed = false', function(req, res, next){
    var id = req.params.quest_id;
    var isComplete = req.params.get('is_Completed');
    if (isComplete === null) {
        return res.status(404).json({'message': ''});
    }
    Quest.find({parent: id, is_Completed = isComplete, function(req, res, next){
        if (err) { return next(err); }
        if (quest === null) {
            return res.status(404).json({'message': ''});
        }
        res.json(quest);
    }
    });
});
*/

//Returns quests sorted by currency reward amount
router.get('/api/quests?sortBounty=asc', function(req, res, next) {
    var quest = new Quest(req.body);
    if(URLSearchParams(sortBounty)){
        if(urlencoded.searchParams.get("sortBounty") == "asc"){
            Quest.find({parent: id}).sort({money_bounty : 'asc'}); 
            if (err) { return next(err); }
            res.json({'quests': quests});
        }
        Quest.find(function(err, quests){
            if(err) { return next(err);}
            res.json({'quests': quests});
        });
        
    }
});
    
    


module.exports = router;


