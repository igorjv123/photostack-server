const router = require("express").Router();
const Messages = require("../../services/message");
var db = require('../../db/db');
const ObjectID = require('mongodb').ObjectID;


router.get('/',function(req,res){
  Messages.allMessages(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
}
);

router.get('/:id', function(req, res){
  Messages.findMessageById(req.params.id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);

  });
});

router.post('/', function(req, res){
  var mess = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text: req.body.text
  };
  Messages.createMessage(mess, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(user);
  })
});

router.put('/:id', function(req, res){
  Messages.changeMessage(req.params.id, req.body, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
});﻿

router.delete('/:id', function(req, res){
  Messages.deleteMessage(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})

module.exports = router;
