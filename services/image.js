var db = require('../db/db');
const ObjectID = require('mongodb').ObjectID;

exports.allImages = function(page, amount, cb){
  db.get().collection('images').find().skip((page*amount)-amount ).limit(amount).toArray((err, docs)=>{
    db.get().collection('images').count((err, count)=>{
      res = {data:docs, dataLength:count }
      cb(err, res);
    })   
  });
}
exports.allImagesOfUser = function(page, amount, userId, cb){
  db.get().collection('images').find({authorId:userId}).skip((page*amount)-amount ).limit(amount).toArray((err, docs)=>{
    db.get().collection('images').count((err, count)=>{
      res = {data:docs, dataLength:count }
      cb(err, res);
    })   
  });
}
exports.paginatedImages = function(page, amount, cb){
  console.log((page*amount)-amount)
  db.get().collection('images').find().skip((page*amount)-amount ).limit(amount).toArray((err, docs)=>{
    cb(err, docs);
  });
}
exports.filteredImages = function(page,amount,body, cb){
  // console.log(query)
  console.log(body)
  let tags = body.filters.tags[0]?body.filters.tags:['Sea','Automobiles','Mountains','Nature','Children', 'People', 'City', 'Sport', 'Rest']
  let date = new Date();
  let val = body.filters.date === 'all'? 10000 : Number(body.filters.date)
  const query = body.search;
  if(val === 30){
    date.setMonth(date.getMonth()-1)
  }
  else{
    date.setDate(date.getDate()-val);
  }
  console.log(page, amount, date, query)
  db.get().collection('images').find({
    $and: [
      {tags: { $in: tags }}, 
      {date: {$gte: date.toISOString()}}, 
      {title:{$regex: `${query}`, $options: "$i"}}
    ]}).skip((page*amount)-amount ).limit(amount).toArray((err, docs)=>{
      db.get().collection('images').countDocuments({
        $and: [
          {tags: { $in: tags }}, 
          {date: {$gte: date.toISOString()}}, 
          {title:{$regex: `${query}`, $options: "$i"}}, 
        ]}, (err, count)=>{
          console.log(count)
          const res = {data:docs, dataLength:count }
          cb(err, res);
        })
      
     
    // })   
    });
}

exports.filteredImagesByUserId = function(page,amount,body,id, cb){
  // console.log(query)
  console.log(body)
  let tags = body.filters.tags[0]?body.filters.tags:['Sea','Automobiles','Mountains','Nature','Children', 'People', 'City', 'Sport', 'Rest']
  let date = new Date();
  let val = body.filters.date === 'all'? 10000 : Number(body.filters.date)
  const query = body.search;
  if(val === 30){
    date.setMonth(date.getMonth()-1)
  }
  else{
    date.setDate(date.getDate()-val);
  }
  console.log(page, amount, date, query)
  db.get().collection('images').find({
    $and: [
      {authorId: id},
      {tags: { $in: tags }}, 
      {date: {$gte: date.toISOString()}}, 
      {title:{$regex: `${query}`, $options: "$i"}}
    ]}).skip((page*amount)-amount ).limit(amount).toArray((err, docs)=>{
      db.get().collection('images').countDocuments({
        $and: [
          {authorId: id},
          {tags: { $in: tags }}, 
          {date: {$gte: date.toISOString()}}, 
          {title:{$regex: `${query}`, $options: "$i"}}, 
        ]}, (err, count)=>{
          console.log(count)
          const res = {data:docs, dataLength:count }
          cb(err, res);
        })
      
     
    // })   
    });
}

exports.findImageById = function(id, cb){
  db.get().collection('images').findOne({_id: ObjectID(id)}, (err,doc)=>{
    cb(err, doc);
  })
}

exports.createImage = function(image, cb){
    db.get().collection('images').insert(image, (err, result)=>{
    cb(err, result);
  });
}

exports.changeImage = function(id, newData, cb){
  db.get().collection('images').update(
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

exports.deleteImage = function(id, cb){
  db.get().collection('images').deleteOne(
      { _id: ObjectID(id)}, 
      (err, result)=>{
          cb(err, result);
      }
  );  
}
