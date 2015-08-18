$(function() {

	$(".land").on("click",function(e) {
		var selCenter = getCenter(this)
		var selId = $(this).attr("id")

		$(".land").each(function(index, el) {
			if ($(el).attr("id") != selId) {

				var center = getCenter(el)
				var offset = {x: selCenter.x-center.x, y: selCenter.y-center.y}
				var length = Math.sqrt((offset.x*offset.x) + (offset.y*offset.y))
				offset.x= offset.x/length * -40
				offset.y= offset.y/length * -40
				$(el).css({"transform": "translate("+(offset.x)+"px,"+(offset.y)+"px)", "fill": "#50E3C2", "fill-opacity": Math.random()*.9+.1})
			} else {
				$(el).css({"transform": "translate(0px,0px)", "fill": "#000", "fill-opacity": 1})
			}
		})

	})
	$("#back").click(function(){
		$(".land").css({"transform": "translate(0px,0px)", "fill": "#50E3C2", "fill-opacity": 1})
	})
})



function getCenter(el) {

	var bBox = el.getBBox()
	return {
		x: bBox.x + bBox.width / 2,
		y: bBox.y + bBox.height / 2
	}
}