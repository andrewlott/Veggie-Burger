
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



var base_url_loc = 'http://api.instagram.com/v1/locations/search?client_id=';

var locs = [];

function startLocation(pos){
    console.log('strt location');
    $.getJSON(  base_url_loc + id + "&callback=?&lat="+pos.lat+"&lng="+pos.lng, loadLoc);

}

function loadLoc(data ,txtStatus, xhr){
    // console.log(data);
      $.each(data.data, function(i, obj){
	  var tmp = {
	      id: obj.id,
	      lat: obj.latitude,
	      lng: obj.longitude
	  }
      	  locs.push(tmp);	  
	  $('.veggie2 .box ul').append('<li class="loading"></li>');
	  getMedia(tmp.id);
     });
};

//queries the image for the given media-id to:
var base_url_media = 'https://api.instagram.com/v1/media/';
function getMedia(media_id){
    //bad naming.. we named client_id as 'id'

// this call desipte the validity of the id returns 503, but jquery's jsonp implementation does not catch such errors. use julian's sol for json-p with jquery
//tried other solution with using textStatus and xhr but still won't catch it with just getJSON -_- the error message in the console is so annoying
    $.jsonp({
    "url": base_url_media + media_id + "?client_id="+id+"&callback=?",
	"success" : function (media, textStatus, xhr){
	    // if there is no data == we have no access rights to this image
	    if (media.data != null){
		$('.veggie2 .box .loading:first').html('<img src=" '+media.data.images.thumbnail.url+'"/>');
		$('.veggie2 .box .loading:first').removeClass('loading');
	    }
	    else media_fail_remove_li(); //remove loading
    },
    "error" : function(d, msg){
	media_fail_remove_li();
    }, 
	cache: true, //take advantage of caching
	pageCache:true
    });
}

function media_fail_remove_li(){ $('.veggie2 .box .loading:first').remove(); }


function err(e){
    console.log(e);
    if (e.code==1) console.log('please give us your location info');
    //just for dev
    startLocation({lat:48.858844, lng:2.294351}); 
}

