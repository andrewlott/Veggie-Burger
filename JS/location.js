
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


var id = 'b9c719516ec54867b756ad8a2f6dcd83';
var secret = '62f7eeac9ebe46f890c74fdfbcc17a7d';
var base_url = 'https://api.instagram.com/v1/locations/search?client_id=';

var locs = [];

function startLocation(pos){
    
    $.getJSON(  base_url + id + "&callback=?&lat="+pos.lat+"&lng="+pos.lng, loadLoc);

}

function loadLoc(data){
     console.log(data);
      $.each(data.data, function(i, obj){
	  if(!~locs.indexOf(obj.images.thumbnail.url))
	  {
	      var tmp = {
	     thumb: obj.images.thumbnail.url, 
	     user: obj.user.username, 
	     title: obj.caption ? obj.caption.text : ''};	      
      	     locs.push(tmp);
	  }
     });
    startPic();    
};

function startPic(){
    $('.veggie2 .box ').fadeOut('slow', function(){
//        $('.veggie2 .box #name').html(locs[index].title +'   -'+locs[index].user);
	$('.veggie2 .box li').each(function(i, obj){
	    $('img', this).attr('src', locs[i].thumb);	    
	});


    });
    $('.veggie2 .box').fadeIn('slow');


}

function err(e){
    console.log(e);
    if (e.code==1) console.log('please give us your location info');
    //just for dev
    startLocation({lat:40, lng:-73.98});
}