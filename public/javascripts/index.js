$(document).ready(function(){

$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/mywharton/media/recent?max_id=1391319508896&client_id=7c7762e8edbd461d85365b7eeb9a16b1",
    success: function(data) {
        for (var i = 0; i < 9; i++) {
            $("#pics").append("<img class=img-circle width=40px src='" 
                + data.data[i].user.profile_picture + "'></img>" 
                //+ "<small>" + data.data[i].user.username + "</small>" 
                + "<img height=150px width=150px src='" + data.data[i].images.thumbnail.url + "'></img>"
                );
        }
    }
});



  //Google Map Coords Philly
   var center = "39.952646,-75.179513&";
   var zoomsize = "zoom=1&";
   var mapsize = "size=800x200&";
   var type="maptype=roadmap&";
   var markers = "markers=color:blue%7C";
   var mycoords1 = "39.952646,-75.179513&";
   var mycoords2 = "39.962646,-75.179513&";
   var sensor = "sensor=false";

   var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + center + zoomsize + mapsize + type + markers + mycoords1 +markers + mycoords2 + sensor;


  $("map").html("<img src='" + url + "'></img>");



});
