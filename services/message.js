var db = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.allMessages = function(cb){
  db.get().collection('messages').find().toArray((err, docs)=>{
      cb(err, docs);
    });
}

exports.findMessageById = function(id, cb){
  db.get().collection('messages').findOne({_id: ObjectID(id)}, (err,doc)=>{
    cb(err, doc);
  })
}

exports.createMessage = function(user, cb){
    db.get().collection('messages').insert(user, (err, result)=>{
    cb(err, result);
  });
}

exports.changeMessage = function(id, newData, cb){
  db.get().collection('messages').update(
      { _id: ObjectID(id) },
      { $set: {
                senderId: newData.senderId,
                receiverId: newData.receiverId,
                text: newData.text}},
              {
          upsert: false,
          multi: false
      },
      (err, result)=>{
          cb(err, result);
      }
  );
}

exports.deleteMessage = function(id, cb){
  db.get().collection('messages').deleteOne(
      { _id: ObjectID(id)},
      (err, result)=>{
          cb(err, result);
      }
  );
}
