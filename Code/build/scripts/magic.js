function drawMap(){$("#map").load("map/map.html",function(){$("#map").css("opacity",1),$(".land").click(function(){country=$(this).attr("iso"),zoom()})})}function zoom(){if(country){var a=$(".land[iso='"+country+"']")[0].getBBox();a.max=a.width,a.height>a.width&&(a.max=a.height);var b=window.innerHeight;window.innerHeight>window.innerWidth&&(b=window.innerWidth),b*=countryZoom;var c=b/a.max,d=mapsize.width/2-(a.x+a.width/2),e=mapsize.height/2-(a.y+a.height/2);$("#map").css({transform:"scale("+c+") translate("+d+"px,"+e+"px)"})}else{var c=1,d=mapsize.offestX,e=mapsize.offestY;window.innerWidth/window.innerHeight>mapsize.width/mapsize.height?(c=window.innerHeight/mapsize.height,d+=.5*(window.innerWidth-mapsize.width*c),d/=c):(c=window.innerWidth/mapsize.width,e+=.5*(window.innerHeight-mapsize.height*c),e/=c),$("#map").css({transform:"scale("+c+") translate("+d+"px,"+e+"px)"})}}var mapsize={width:1010,height:666,offestY:0,offestX:0},country;countryZoom=.2,$(function(){drawMap(),$(window).resize(function(){zoom()})});