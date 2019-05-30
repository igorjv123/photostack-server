var db = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.allComments = function(cb){
  db.get().collection('comments').find().toArray((err, docs)=>{
      cb(err, docs);
    });
}
exports.findCommentByImageId = function(ID, cb){
  console.log(ID)
  db.get().collection('comments').find({imageId: ID}).toArray((err,doc)=>{
    cb(err, doc);
  })
}

exports.createComment = function(image, cb){
    db.get().collection('comments').insert(image, (err, result)=>{
    cb(err, result);
  });
}

exports.changeComment = function(id, newData, cb){
  db.get().collection('comments').update(
      { _id: ObjectID(id) },
      { $set: {
          ...newData
        }
      },
              {
        upsert: false,
        multi: false
      },
      (err, result)=>{
          cb(err, result);
      }
  );
}

exports.deleteComment = function(id, cb){
  db.get().collection('comments').deleteOne(
      { _id: ObjectID(id)},
      (err, result)=>{
          cb(err, result);
      }
  );
}
