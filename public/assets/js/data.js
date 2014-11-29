var mongoose = require ('mongoose');

var latlng = new Array();
var id = new Array();
var text = new Array();
var date = new Array();
var category = new Array();
var feeling = new Array();
var hashtag = new Array();
var author = new Array(); 

function getlat(callback){
  mongoose.model('stories').find({},function(err, companies) {
    if(err){
      return callback(err, latlng, id, text, date, category, feeling, hashtag, author);
    }
    for (var i = 0; i < companies.length; i++) {
        latlng[i] = JSON.stringify(companies[i].place);
        id[i] = companies[i]._id;
        text[i] = companies[i].text;
        date[i] = companies[i].posted;
        category[i] = companies[i].category;
        feeling[i] = companies[i].feeling;
        hashtag[i] = companies[i].hashtag;
        author[i] = companies[i].author;
    }
    return callback(null, latlng, id, text, date, category, feeling, hashtag, author);
 });
}
module.exports = getlat;