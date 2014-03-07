$(document).ready(function(){

var coords = new Array();
var latitudes = new Array();
var longitudes = new Array();
var locationnames = new Array();

//Google Map Coords Philly
var center = "39.952646,-75.179513&";
var zoomsize = "zoom=1&";
var mapsize = "size=600x375&";
var type="maptype=roadmap&";
var markers = "markers=color:red%7C";
var mycoords1 = "39.952646,-75.179513&";
var mycoords2 = "39.962646,-75.179513&";
var sensor = "sensor=false";
var coordinates = "";


$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/mywharton/media/recent?client_id=7c7762e8edbd461d85365b7eeb9a16b1",
    success: function(data) {
        for (var i = 0; i < 18; i++) {
            $("#pics").append(
              //"<img class=img-circle width=40px src='" + data.data[i].user.profile_picture + "'></img>" 
                //+ "<small>" + data.data[i].user.username + "</small>" 
               "<img height=100px width=100px src='" + data.data[i].images.thumbnail.url + "'></img>"
                );
            if (data.data[i].location != null){
                  latitudes.push(data.data[i].location.latitude);
                  longitudes.push(data.data[i].location.longitude);
               if (data.data[i].caption.text != null){
                   locationnames.push(data.data[i].caption.text);
               }
            }
        }
        for (i=0; i<latitudes.length; i++){
        coords.push(markers + latitudes[i] + "," + longitudes[i]);
        console.log(coords[i]);
        coordinates += coords[i] + "&";
        console.log(coordinates);
        }

        for (i=0; i<5; i++){
          $("#locations").append("<li>"+locationnames[i])+"</li>";
        }

        var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + center + zoomsize + mapsize + type + coordinates + sensor;
        console.log(url);
        $("map").after("<img src='" + url + "'></img>");

    }
});

   //var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + center + zoomsize + mapsize + type + markers + mycoords1 +markers + mycoords2 + sensor;


  //$("map").html("<img src='" + url + "'></img>");

   


});
