var id = 'b9c719516ec54867b756ad8a2f6dcd83';
var secret = '62f7eeac9ebe46f890c74fdfbcc17a7d';
var base_url = 'https://api.instagram.com/v1/media/popular?client_id=';

num = 16;//$('.box li').length;
pics = [];
index = 0;


//init placeholders
$('.box').hide();
for (var i=0; i<num; i++)
    $('.box ul').append('<li><img src=""/></li>');

getImgs(num);



function getImgs(total){
$.getJSON(  base_url + id + "&callback=?&count="+total,load);

}


function load(data){
     console.log(data);
      $.each(data.data, function(i, obj){
	  if(!~pics.indexOf(obj.images.thumbnail.url)){
	      var tmp = {
	     thumb: obj.images.thumbnail.url, 
	     user: obj.user.username, 
	     title: obj.caption ? obj.caption.text : ''};
	     pics.push(tmp);
	  }
     });
     if(index==0){
        start();
        $('.veggie1 .box').fadeIn('slow');
     }
};
function start() {
    //init the box with 
    swap();
    //then start off the timer
    setInterval(swap, 5000);
}

function swap() {

    $('.veggie1 .box ').fadeOut('slow', function(){
        $('.veggie1 .box #name').html(pics[index].title +'   -'+pics[index].user);
	$('.veggie1 .box li img').attr('src', pics[index++].thumb);

    });
    $('.veggie1 .box').fadeIn('slow', function(){
	if(index % num == 0){
	    console.log(index);
	    getImgs(index*Math.floor(index/num.round) );
	}	
    });

    
}