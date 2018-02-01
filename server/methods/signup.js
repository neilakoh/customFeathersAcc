const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = 'mongodb://localhost:27017/feathers-account';

const base64 = require('base-64');
const utf8 = require('utf8');
const bcrypt = require('bcrypt');

const UserSchema = require('../schema/user.json');
const { SchemaValidation } = require('../schema/validator.js');

module.exports = {
  signup: function(userInfo) {
    return new Promise(function (resolve){
      try {

        let bytes = utf8.encode(userInfo.password);
        let encoded = base64.encode(bytes);
        let saltRounds = 10;

        SchemaValidation(UserSchema, userInfo).then((res, err)=>{
          if(err) {
            resolve({
              success: false,
              reason: err
            });
          } else {
            if(res.success) {
              bcrypt.hash(encoded, saltRounds, function(err, hash) {
                MongoClient.connect(mongoUrl).then(db => {

                  userInfo.password = hash;

                  db.collection('users').insert(userInfo).then((result)=>{
                    resolve({
                      success: true,
                      data: result
                    });
                  });

                }).catch((connErr)=>{
                  resolve({
                    success: false,
                    reason: connErr.message
                  });
                });
              });
            } else {
              resolve({
                success: false,
                reason: res.reasons
              });
            }
          }
        });

      } catch(e) {
        resolve({
          success: false,
          reason: e
        });
      }
    });
  },

  login: function(userInfo) {
    return new Promise(function (resolve){
      let bytes = utf8.encode(userInfo.password);
      let encoded = base64.encode(bytes);
      let saltRounds = 10;

      bcrypt.compare(encoded, hash, function(err, res) {
        console.log(res);
      });
    });
  },
}
