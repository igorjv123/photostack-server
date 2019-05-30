var db = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.allMarks = function(cb){
  db.get().collection('marks').find().toArray((err, docs)=>{
      cb(err, docs);
    });
}

exports.findMarkById = function(id, cb){
  db.get().collection('marks').findOne({_id: ObjectID(id)}, (err,doc)=>{
    cb(err, doc);
  })
}
exports.findMarkByParamsId = function(authorId, imageId, cb){
  db.get().collection('marks').findOne({$and: [{authorId: authorId},{imageId:imageId}]}, (err,doc)=>{
    console.log(doc)
    cb(err, doc);
  })
}
exports.findMarkByAuthorId = function(id, cb){
  db.get().collection('marks').findOne({authorId: ObjectID(id)}, (err,doc)=>{
    cb(err, doc);
  })
}
exports.aggregateMarkByImageId = function(id, cb){
  db.get().collection('marks').find({imageId: id}).toArray((err,docs)=>{
    let avg = 0;
    for(let doc of docs ){
      avg+=Number(doc.mark)
    }
    avg = avg/docs.length
    let res = {
      mark:avg,
      amount:docs.length
    }
    cb(err, res);
  })
}

exports.createMark = function(message, cb){
    db.get().collection('marks').insert(message, (err, result)=>{
    cb(err, result);
  });
}

exports.changeMark = function(id, newData, cb){
  db.get().collection('marks').update(
      { _id: ObjectID(id) },
      { $set: { mark: newData.mark, date:newData.date}},
      {
          upsert: false,
          multi: false
      },
      (err, result)=>{
          cb(err, result);
      }
  );
}

exports.deleteMark = function(id, cb){
  db.get().collection('marks').deleteOne(
      { _id: ObjectID(id)},
      (err, result)=>{
          cb(err, result);
      }
  );
}
