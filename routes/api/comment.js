const router = require("express").Router();
const Comments = require("../../services/comment");
var db = require('../../db/db');
const ObjectID = require('mongodb').ObjectID;


router.get('/',function(req,res){
    Comments.allComments(function(err, docs){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  }
);

router.get('/:id', function(req, res){
  // console.log(req.params)
  let { id } = req.params
  Comments.findCommentByImageId(id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    
    res.send(doc);

  });
});

router.post('/', function(req, res){
  let date = new Date()
  let {authorFullName, authorId, imageId, text, answerTo} = req.body
  var mess = {
    authorFullName: authorFullName,
    authorId: authorId,
    createdAt:date,
    text:text,
    imageId: imageId, 
    answerTo:answerTo
  };
  Comments.createComment(mess, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  })
});

router.put('/:id', function(req, res){
  Comments.changeComment(req.params.id, req.body, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
});

router.delete('/:id', function(req, res){
  Comments.deleteComment(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})

router.post('/filters', function(req, res){
  console.log(req.body)
  if(req.body){
    Comments.filteredComments(req.body, function(err, docs){
      
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  }
  else{
    Comments.allComments(function(err, docs){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  }
});



module.exports = router;
