var User = require('./../models/user').User,
    _ = require('underscore'),
    bcrypt = require('bcrypt');

function getEncryptedPassword(password, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(hash);
    });
  });
}

module.exports = {
  index: function(req, res) {
    console.log('users index');
    User.find({}, function(err, users) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        _.each(users, function(user){
          user.password = undefined;
        });
        console.log("yolo", users);
        res.json(users);
      }
    });
  },
  show: function(req, res) {
    console.log('users show');
    User.findById(req.params.uid, function(err, user) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        user.password = undefined;
        console.log(user);
        res.json(user);
      }
    });
  },
  create: function(req, res) {
    console.log('users create', req.params, req.body);
    User.findOne({email: req.body.email}, function(err, user){
      if(!user){
        getEncryptedPassword(req.body.password, function(encryptedPassword){
          req.body.password = encryptedPassword;
          User.create(req.body, function(err, user) {
            if (err) {
              res.status(500).json({err: 'internal error'});
            } else {
              res.json(user);
            }
          });
        });
      }else{
        res.json({err: 'emailexists'});        
      }
    });
  },
  update: function(req, res) {
    console.log('users update', req.params, req.body);

    var newUser = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id" && key != "password"){
        newUser[key] = value;
      }
    });

    if(req.body.password){
      getEncryptedPassword(req.body.password, function(encryptedPassword){
        newUser.password = encryptedPassword;
        User.findByIdAndUpdate(req.params.uid, newUser, {}, function(err){
          if(err){
            res.status(500).json({err: 'internal error'});
          } else {
            res.json({msg:'success'});
          }
        });
      });
    }else{
      User.findByIdAndUpdate(req.params.uid, newUser, function(err){
        if(err){
          res.status(500).json({err: 'internal error'});
        } else {
          res.json({msg:'success'});
        }
      });
    }
  },
  destroy: function(req, res) {
    console.log('users destroy', req.params, req.body);
    User.remove( {_id: req.params.uid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        res.json({msg:'success'});
      }
    });
  },
  session: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
      if(err){
        res.status(500).json({err: 'internal error'});
      }else if(user){
        console.log(user);
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.json(user);
        }
        res.json({err: 'nomatch'});
      }else{
        res.json({err: 'notfound'});
      }
    });
  }
};




