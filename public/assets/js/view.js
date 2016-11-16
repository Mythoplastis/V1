
function initialize() {
    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
    center: new google.maps.LatLng(53.467216, -2.233701),
    disableDoubleClickZoom: true, 
    zoom: 15,
    styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"gamma":0.8},{"lightness":4},{"saturation":-100}]},{"featureType":"poi.park","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}],
  };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
     var marker, i;

<script src="assets/js/data.js"></script>
 var data = [ 
        '"(53.464111624815494, -2.2338683903217316)"', 
        '"(53.46692188087774, -2.2315509617328644)"', 
        '"(53.46413717343583, -2.2330529987812042)"', 
        '"(53.4639838814831, -2.235284596681595)"'];

     for (var i = 0; i < data.length; i++) {
        var mylocation = data[i];

        var lat = mylocation.replace(/^\"\(([0-9-.]*),.*/g, "$1");
        var lng = mylocation.replace(/.*,\s*([0-9-.]*)\)\"$/g, "$1");
        var latLng = new google.maps.LatLng(lat, lng);
    }
}
google.maps.event.addDomListener(window, 'load', initialize);