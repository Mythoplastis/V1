var express = require('express');
var engines = require('consolidate');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var hash = require('./pass').hash;
var util = require('util');
var routes = require('./routes');
var users = require('./routes/user');
var autoIncrement = require('mongoose-auto-increment');

var app = express();

var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Work", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

//Database and Models
//this works

var connection= mongoose.connect("mongodb://localhost/Work");
autoIncrement.initialize(connection);

var UserSchema = new mongoose.Schema({
    fullName:String,
    age: String,
    city: String,
    job: String,
    username: String,
    password: String,
    _id: String,
    salt: String,
    hash: String,
    Umb: Boolean,
    circle: Boolean,
    tree: Boolean,
    Books: Boolean,
    flag: Boolean
});

var User = mongoose.model('users', UserSchema);

var MissionSchema = new mongoose.Schema({
        umb1: String,
        umb2: String,
        umb3: String,
        author: String
});

var Missions = mongoose.model('missions', MissionSchema);

var StorySchema = new mongoose.Schema({
    text: String,
    posted: Date,
    place: String,
    author: String,
    category: String,
    hashtag: String,
    feeling: String,
});

var Story = mongoose.model('stories', StorySchema);

var commentSchema = new mongoose.Schema({
    commentbod: String,
    comauthor: String,
    composted: Date,
});

var Comment = mongoose.model('comments', commentSchema);

StorySchema.plugin(autoIncrement.plugin, {
    model: 'Story',
    startAt: 0
    });



// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.set('PORT', 8887);

app.use(favicon());
//app.use(logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('Authentication Tutorial '));
app.use(express.session());
app.use(express.methodOverride());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);


app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

/// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});


//functions

function authenticate(_id, pass, fn) {
    if (!module.parent) console.log('authenticating %s', _id);

    User.findOne({
        _id: _id
    },

    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            hash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);
                fn(new Error('invalid password'));
            });
        } else {
            return fn(new Error('cannot find user'));
        }
    });

}

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/');
    }
}

function userExist(req, res, next) {
    User.count({
        _id: req.body.email
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist";
            res.redirect('/');
        }
    });
}

//routes
app.get('/', function (req, res) {

    if (req.session.user) {
        res.render('samples');
    } else {
        res.redirect('/');
    }
});

app.get('/umbrella', function (req, res) {

    if (req.session.user) {
        res.render('umbrella');
    } else {
        res.redirect('/');
    }
});

app.get('/locations', function (req, res) {

    if (req.session.user) {
        res.render('locations');
    } else {
        res.redirect('/');
    }
});

app.get('/5points', function (req, res) {
    var umbrella = req.session.user.Umb;
    var circle = req.session.user.circle;
    if (req.session.user) {
        res.render('5points', {umbrella: umbrella, circle: circle});
    } else {
        res.redirect('/');
    }
});

app.get('/somelocation', function (req, res) {

    if (req.session.user) {
        res.render('somelocation');
    } else {
        res.redirect('/');
    }
});

app.get('/location', function (req, res) {

    if (req.session.user) {
        res.render('location');
    } else {
        res.redirect('/');
    }
});
app.get('/umbrela', function (req, res) {

    if (req.session.user) {
        res.render('umbrela');
    } else {
        res.redirect('/');
    }
});
app.post("/samples", userExist, function (req, res) {
    var _id = req.body.email;
    var password = req.body.password;

    hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            _id:req.body.email,
            fullName:req.body.fullName,
            age:req.body.age,
            city:req.body.city,
            job:req.body.job,
            username:req.body.username,
            salt: salt,
            hash: hash,
            Umb: false,
            circle: false,
            tree: false,
            Books: false,
            flag: false
        }).save(function (err, newUser) {
            if (err) throw err;
            authenticate(newUser._id, password, function(err, user){
                if(user){
                    req.session.regenerate(function(){
                        req.session.user = user;
                        res.render('missions');
 
                    });
                }
            });
        });
    });
});

app.get('/samples', function (req, res) {

    if (req.session.user) {
        res.render('samples');
    } else {
        res.redirect('/');
    }
});

app.get('/new', function (req, res) {

    if (req.session.user) {
        res.render('new');
    } else {
        res.redirect('/');
    }
});

app.get('/books', function (req, res) {

    if (req.session.user) {
        res.render('books');
    } else {
        res.redirect('/');
    }
});
app.get('/circles', function (req, res) {

    if (req.session.user) {
        res.render('circles');
    } else {
        res.redirect('/');
    }
});
app.post("/logedin", function (req, res) {
    authenticate(req.body.emaillog, req.body.passwordlog, function (err, user) {
        if (user) {

            req.session.regenerate(function () {

                req.session.user = user;
                req.session.success = res.render('locations');
                
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            console.log('wrong username');
        }
    });
});


app.post("/new", function(req,res){
    var story = new Story({
        text: req.body.textarea,
        posted:  new Date(),
        place: req.body.place,
        category: req.body.category,
        feeling: req.body.feeling,
        hashtag: req.body.hashtag,
        author: req.session.user.username,
    });

    story.save(function (err, story) {
        if (err) res.json(err);
        //res.end('Registration '+user.username +' Ok!');
        else 
        res.render('portfolio');
    });
});

app.post("/Submitted", function(req,res){ 
    var conditions = mongoose.model('users').findOne({username: req.session.user.username}, function (err, doc){
      doc.Umb = true;
      doc.save();
    });
    var missions = new Missions({
        umb1: req.body.umb1,
        umb2: req.body.umb2,
        umb3: req.body.umb3,
        author: req.session.user.username,
    });
    missions.save(function (err, story) {
        if (err) res.json(err);
        else 
        res.render('5points');
    });
});

app.post("/circle-submitted", function(req,res){ 
    var conditions = mongoose.model('users').findOne({username: req.session.user.username}, function (err, doc){
      doc.circle = true;
      doc.save();
        res.redirect('5points');
    });
    });

app.get('/portfolio', function (req, res) {

    if (req.session.user) {
        res.render('portfolio');
    } else {
        res.redirect('/');
    }
});

app.get('/missions', function (req, res) {

    if (req.session.user) {
        res.render('missions');
    } else {
        res.redirect('/');
    }
});

/*
app.get('/ViewMode', function (req, res) {

    if (req.session.user) {
        res.render('ViewMode');
    } else {
        res.redirect('/');
    }
});

var getlat = require ("./public/assets/js/data.js");
app.get('/test', function(req, res){

  getlat(function(err, latlng, id, text, date, category, feeling, hashtag, author){
    if(err){
      return res.send(500);
    } 
    console.log("loading points");
    res.render('viewMode', {
        latlng: latlng,
        id: id,
        category: category,
        feeling: feeling,
        hashtag: hashtag,
        author: author,
        text: text,
    });
   });
});
*/
var getlat = require ("./public/assets/js/data.js");
app.get('/here', function(req, res){

  getlat(function(err, latlng, id, text, date, category, feeling, hashtag, author){
    if(err){
      return res.send(500);
    } 
    console.log("loading points");
    res.render('samples', {
        latlng: latlng,
        id: id,
        category: category,
        feeling: feeling,
        hashtag: hashtag,
        author: author,
        text: text,
    });
   });
});

app.post("/here", function(req,res){
    var comment = new Comment({
        commentbod: req.body.comment,
        comauthor: req.session.user.username,
        composted: new Date(),
    });

    comment.save(function (err, story) {
        if (err) res.json(err);
        //res.end('Registration '+user.username +' Ok!');
        else 
        console.log("Successfully added")    
});
});


 
app.listen(app.get('PORT'));
console.log('-------------------------------------------');
console.log("Server Port: " + app.get('PORT'));
