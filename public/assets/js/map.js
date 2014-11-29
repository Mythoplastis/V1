
var map;
var markers = [];

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(53.467216, -2.233701),
    disableDoubleClickZoom: true, 
    zoom: 15,
     styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"gamma":0.8},{"lightness":4},{"saturation":-100}]},{"featureType":"poi.park","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}],
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  var layer = new google.maps.visualization.DynamicMapsEngineLayer({
    mapId: '16665525185230662248-09052745394509652502',
    map: map
  });

    var Makepoint = google.maps.event.addListener(map, 'mouseup', function(event) {
     placeMarker(event.latLng); 

    google.maps.event.removeListener(Makepoint);
  });
}

var contentString = 
             '<div class="content">'+
          '<a>If you want to change the location you can easily drag the marker anywhere you want. If the location is fine click continue to submit your story</a>'+
          '<div class="col-sm-offset-1 col-sm-9">'+
          '<br>'+
            '<button type="Register" href="#Continue" data-toggle="modal" class="btn btn-success "> Continue</button>'+
          '</div>'+
        '</div>'+
      '</div>';
                                    
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

var image = 'libs/link/img/Dialogue.png';

function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      draggable:true,
      animation:google.maps.Animation.DROP,
      map: map,
      icon: image
  });
markers.push(marker);

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

 google.maps.event.addListener(marker, 'mouseup', function() {
    document.getElementById("place").value = marker.position;

        infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
google.maps.event.addDomListener(window, 'load', initialize); 
