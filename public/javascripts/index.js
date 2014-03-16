$(document).ready(function(){

var map;
pictureURLS = new Array();
entireData = new Array();
var infowindow = null;

function initialize() {

    //Coordinates of Philadelphia
    var myLatlng = new google.maps.LatLng(39.952646,-75.179513);
    var mapOptions = {
      zoom: 2,
      center: myLatlng
      };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    for (var i = 0; i < entireData.length; i++) {

      var image = {
      url: entireData[i].user.profile_picture,
      scaledSize: new google.maps.Size(40, 40), // size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(20, 20), // anchor 
      };

      var coords = entireData[i].location;
      var myLatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
      var marker = new google.maps.Marker({
      position: myLatLng,
      icon: image,
      animation: google.maps.Animation.DROP,
      map: map,
      });

      infowindow = new google.maps.InfoWindow({
      //content: "<img height=50px width=50px src=" + entireData[i].images.thumbnail.url + "></img><br>" + entireData[0].caption.text
      content: "holding...",
      maxWidth: 300 
      });
      var content = "<caption><img height=75px width=75px src=" + 
      entireData[i].images.thumbnail.url + "></img><br>" + entireData[i].caption.text + "</caption>"
      
      bindInfoWindow(marker, map, infowindow, content);

      //google.maps.event.addListener(marker, 'click', function () {
        //console.log("in");
        //infowindow.setContent(this.html);
        //infowindow.open(map, marker);
      //});
    }
}

function bindInfoWindow(marker, map, infowindow, strDescription) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(strDescription);
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);


});


function setInfoWindow(map, marker){

    //var contentString = '<img height=50px width=50px src=' + entireData[i].images.thumbnail.url + '></img><br>'+entireData[0].caption.text;
    
    var contentString = 'hi';
    //set the infowindow
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300     
      });

    //var coords = entireData[i].location;
    //var myLatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
    var position = marker.position;
    console.log(marker.position);

    };
function setMarkers(map, entireData){

  for (var i = 0; i < entireData.length; i++) {

    var image = {
      url: entireData[i].user.profile_picture,
      scaledSize: new google.maps.Size(30, 30), // size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(15, 15), // anchor 
    };

    var coords = entireData[i].location;
    var myLatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
    marker = new google.maps.Marker({
        position: myLatLng,
        icon: image,
        animation: google.maps.Animation.DROP,
        map: map,
    });
  }
 };

//API Call
$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/mywharton/media/recent?client_id=7c7762e8edbd461d85365b7eeb9a16b1",
    success: function(data) {
        //entireData = data;
        for (var i = 0; i < 20; i++) {
            $("#pics").append(
               "<a href='" +  
               data.data[i].images.standard_resolution.url + 
               "' data-lightbox='instagram' title='"+
               data.data[i].caption.text +
               "'><img height=100px width=100px data-lightbox=instagram src='" + 
               data.data[i].images.thumbnail.url +
               "'></img></a>"
              );
            console.log

            if (data.data[i].location!=null){
              entireData.push(data.data[i]);
            };
        }
    }
});

