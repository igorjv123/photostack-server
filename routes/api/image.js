const router = require("express").Router();
const Images = require("../../services/image");
var db = require('../../db/db');
const ObjectID = require('mongodb').ObjectID;


router.get('/',function(req,res){
  const page = Number(req.query.page)
  const amount = Number(req.query.amount)
    Images.allImages(page, amount, function(err, docs){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
      })
    }
);

router.get('/:id', function(req, res){
  Images.findImageById(req.params.id, function(err, doc){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);

  });
});

router.post('/', function(req, res){
  let {authorFullName, authorId, date, description, image, private, tags, title} = req.body
  var mess = {
    authorFullName: authorFullName,
    authorId: authorId,
    date:date,
    description:description,
    image: image, 
    private: private,
    tags: tags,
    title: title
  };
  Images.createImage(mess, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  })
});

router.put('/:id', function(req, res){
  Images.changeImage(req.params.id, req.body, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
});

router.delete('/:id', function(req, res){
  Images.deleteImage(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})

router.post('/filters', function(req, res){
  const page = parseInt(req.query.page)
  const amount = parseInt(req.query.amount)
  const userId = req.query.userId?req.query.userId:null
  console.log(req.query)
  
  if(userId && req.body){
    Images.filteredImagesByUserId(page, amount, req.body, userId,function(err, docs){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
      })
    }
  else if(req.body){
    Images.filteredImages(page, amount, req.body, function(err, docs){
      
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  }
  else{
    Images.allImages(function(err, docs){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  }
});



module.exports = router;
