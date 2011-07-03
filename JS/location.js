
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setLocation, err);
        console.log("ww");
}



function setLocation(position){
var lat =  position.coords.latitude;
var lng = position.coords.longitude;
console.log("Your location is: " + lat+ ", "  + lng);

}

function err(e){
    console.log(e);
    if (e.code==1) console.log('please give us your location info');
}