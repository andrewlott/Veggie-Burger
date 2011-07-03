var id = 'b9c719516ec54867b756ad8a2f6dcd83';
var secret = '62f7eeac9ebe46f890c74fdfbcc17a7d';
var base_url = 'https://api.instagram.com/v1/media/popular?client_id=';

num = 16;//$('.box li').length;
thumbs = [];
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
      $.each(data.data, function(i, obj){
	  if(!~thumbs.indexOf(obj.images.thumbnail.url))
	     thumbs.push(obj.images.thumbnail.url);
      });
    if(index==0){
	start();
	$('.box').fadeIn('slow');
    }
};

function start() {
    //init the box with 
    swap();
    //then start off the timer
    setInterval(swap, 5000);
}

function swap() {

    $('.box ul').fadeOut('slow', function(){
    console.log(thumbs[index]);
	$('.box li img').attr('src', thumbs[index++]);
    });
    $('.box ul').fadeIn('slow', function(){
	if(index % num == 0){
	    console.log(index);
	    getImgs(index*Math.floor(index/num.round) );
	}	
    });

    
}