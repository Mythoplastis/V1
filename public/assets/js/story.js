var mongoose = require ('mongoose');

var id = new Array();
var text = new Array();
var date = new Array();
var category = new Array();
var feeling = new Array();
var title = new Array();
var author = new Array();

function getstory(callback){
  mongoose.model('stories').find({},function(err, companies) {
    if(err){
      return callback(err, id, text, date, category, feeling, title, author);
    }
    for (var i = 0; i < companies.length; i++) {
        id[i] = companies[i]._id;
        text[i] = companies[i].text;
        date[i] = companies[i].posted;
        category[i] = companies[i].category;
        feeling[i] = companies[i].feeling;
        title[i]=companies[i].hashtag;
        author[i] = companies[i].author;
    }
    return callback(null, id, text, date, category, feeling, title, author);
 });
}
module.exports = getstory;
