const userRouter = require("express").Router();
const Users = require("../../services/user");
var db = require("../../db/db");
const ObjectID = require("mongodb").ObjectID;


userRouter.get("/", function(req,res){
  Users.allUsers(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
});

userRouter.get("/:id", function(req, res){
  Users.findUserById(req.params.id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
});

userRouter.post("/", function(req, res){
  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    photo: null,
    createdAt:new Date()
  };
  Users.createUser(user, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(user);
  })
});

userRouter.put("/:id", function(req, res){
  Users.changeUser(req.params.id, req.body, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);;
  })
});﻿

userRouter.delete("/:id", function(req, res){
  Users.deleteUser(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);;
  })
})
module.exports = userRouter;
