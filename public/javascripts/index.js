$(function() {

$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/tags/mywharton/media/recent?max_id=1391319508896&client_id=7c7762e8edbd461d85365b7eeb9a16b1",
    success: function(data) {
        for (var i = 0; i < 21; i++) {
            $("#pics").append("<img src='" + data.data[i].images.thumbnail.url + "'></img>");
            $("#pics").append(data.data[i].user.username);
            $("#pics").append("<img src='" + data.data[i].user.profile_picture + "'></img>");
        }
    }
});
});
