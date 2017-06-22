const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = 'mongodb://localhost:27017/feathers-account';

const base64 = require('base-64');
const utf8 = require('utf8');
const bcrypt = require('bcrypt');

module.exports = {
  signup: function(userInfo) {
    return new Promise(function (resolve, reject){
      try {
        let bytes = utf8.encode(userInfo.password);
        let encoded = base64.encode(bytes);
        let saltRounds = 10;

        bcrypt.hash(encoded, saltRounds, function(err, hash) {
          MongoClient.connect(mongoUrl).then(db => {

            db.collection('users').insert({
              username: userInfo.username,
              email: userInfo.email,
              password: hash,
            }).then((result)=>{
              resolve(result);
            });

          });
        });
      } catch(e) {
        reject(e)
      }
    });
  },

  login: function(userInfo) {
    return new Promise(function (resolve, reject){
      let bytes = utf8.encode(userInfo.password);
      let encoded = base64.encode(bytes);
      let saltRounds = 10;

      bcrypt.compare(encoded, hash, function(err, res) {
        console.log(res);
      });
    });
  },
}
