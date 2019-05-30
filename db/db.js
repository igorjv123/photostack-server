const MongoClient = require('mongodb').MongoClient;

var state = {
  db:null
};

exports.connect = function(url, done){
  if(state.db){
    return done();
  }
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
    if (err) {
      return done(err);
    }
    state.db = db.db('users');
    done();
  })
}
exports.get = function(){
  return state.db;
}
