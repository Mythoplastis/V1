function initialize() {
      var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
      var mapOptions = {
      center: new google.maps.LatLng(53.467216, -2.233701),
      disableDoubleClickZoom: true,
      zoom: 15,
      styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"gamma":0.8},{"lightness":4},{"saturation":-100}]},{"featureType":"poi.park","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}],
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      var mcOptions = {gridSize: 5, maxZoom: 15};
      var markers = [];
      var loc = !{JSON.stringify(latlng)};

      for (var i = 0; i <loc.length; i++) {
      var mylocation = loc[i];
      var lat = mylocation.replace(/^\"\(([0-9-.]*),.*/g, "$1");
      var lng = mylocation.replace(/.*,\s*([0-9-.]*)\)\"$/g, "$1");
      var latLng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({
      position: latLng,
      map:map
      });
      markers.push(marker);
      }
      var mc = new MarkerClusterer(map, markers);
      };
      google.maps.event.addDomListener(window, 'load', initialize);

