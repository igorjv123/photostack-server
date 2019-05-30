const markRouter = require("express").Router();
const Marks = require("../../services/mark");
var db = require("../../db/db");
const ObjectID = require("mongodb").ObjectID;


markRouter.get("/", function(req,res){
  Marks.allMarks(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
});

markRouter.post("/by", function(req, res){
  const {authorId, imageId} = req.body
  Marks.findMarkByParamsId(authorId, imageId, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if(doc === null){
      Marks.createMark(req.body, function(err, result){
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.send(result);
      }) 
    }
    else{
      Marks.changeMark(doc._id, req.body, function(err, result){
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);;
      })
    }
  })
});
markRouter.get("/:id", function(req, res){
  Marks.findMarkById(req.params.id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
});
markRouter.get("/image/:id", function(req, res){
  Marks.aggregateMarkByImageId(req.params.id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
});

markRouter.post("/", function(req, res){
  var mark = {
    ...req.body
  };
  Marks.createMark(mark, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(mark);
  })
});

markRouter.put("/:id", function(req, res){
  Marks.changeMark(req.params.id, req.body, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);;
  })
});

markRouter.delete("/:id", function(req, res){
  Marks.deleteMark(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);;
  })
})
module.exports = markRouter;
