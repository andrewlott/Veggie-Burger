
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setLocation, err);
}


function setLocation(position){
    var pos = {
	lat : position.coords.latitude,
	lng: position.coords.longitude
    };
    
    console.log("Your location is: " + pos.lat+ ", "  + pos.lng);

    startLocation(pos);

}



var base_url_loc = 'https://api.instagram.com/v1/locations/search?client_id=';

var locs = [];

function startLocation(pos){
    console.log('strt location');
    $.getJSON(  base_url_loc + id + "&callback=?&lat="+pos.lat+"&lng="+pos.lng, loadLoc);

}

function loadLoc(data){
     console.log(data);
      $.each(data.data, function(i, obj){
	      var tmp = {
		  id: obj.id,
		  lat: obj.latitude,
		  lng: obj.longitude}
      	      locs.push(tmp);

     });
    startPic();    
};

function startPic(){
    $('.veggie2 .box ').fadeOut('slow', function(){

	var numLocs = locs.length > num ? num : locs.length; // num is the global var used in instagram.js to specify the num of images
	for(i=0; i< numLocs; i++){
	  $('.veggie2 .box ul').append('<li>'+ locs[i].id + '</li>');
	  //        $('.veggie2 .box #name').html(locs[index].title +'   -'+locs[index].user);
	}
	
    });
    $('.veggie2 .box').fadeIn('slow');


}

function err(e){
    console.log(e);
    if (e.code==1) console.log('please give us your location info');
    //just for dev
    startLocation({lat:48.858844, lng:2.294351}); 
}

