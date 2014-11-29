var mongoose = require ('mongoose');

function getlng(callback){
  var lng = new Array();
  // this function here is async, so use a callback to "return" the result
  mongoose.model('stories').find({},function(err, companies) {
    if(err){
      return callback(err, lng, rank);
    }
    for (var i = 0; i < companies.length; i++) {
      lng[i] = JSON.stringify(companies[i].Lng);
      rank[i] = companies[i].hashtag;
    }
    return callback(null, lng, rank);
 });

}

// then export the function
module.exports = getlng;