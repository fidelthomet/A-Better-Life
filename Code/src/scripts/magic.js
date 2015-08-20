var mapsize = {
		width: 1010,
		height: 666,
		offestY: 0,
		offestX: 0
	},

	country
countryZoom = .2,


	$(function() {

		drawMap()

		$(window).resize(function() {
			zoom()
		})

	})

function drawMap() {
	// zoom()

	$("#map").load("map/map.html", function() {
		$("#map").css("opacity", 1)
		$(".land").click(function() {
			country = $(this).attr("iso")
			zoom()
		})
	})
}

function zoom() {

	if (!country) {

		var factor = 1
		var x = mapsize.offestX,
			y = mapsize.offestY
		if (window.innerWidth / window.innerHeight > mapsize.width / mapsize.height) {
			factor = window.innerHeight / mapsize.height
			x += (window.innerWidth - mapsize.width * factor) * .5
			x /= factor
		} else {
			factor = window.innerWidth / mapsize.width
			y += (window.innerHeight - mapsize.height * factor) * .5
			y /= factor
		}
		// $("#map").attr("style", "transform: scale(" + factor + ") translate(" + x + "px," + y + "px)")
		$("#map").css({
			"transform": "scale(" + factor + ") translate(" + x + "px," + y + "px)"
		})
	} else {

		var bBox = $(".land[iso='" + country + "']")[0].getBBox()
		bBox.max = bBox.width
		if (bBox.height > bBox.width) {
			bBox.max = bBox.height
		}
		var focusSize = window.innerHeight
		if (window.innerHeight > window.innerWidth) {
			focusSize = window.innerWidth
		}

		focusSize *= countryZoom
		var factor = focusSize / bBox.max


		var x = mapsize.width/2-(bBox.x+bBox.width/2)
		var y = mapsize.height/2-(bBox.y+bBox.height/2)
		
		// var x = (window.innerWidth/2)/factor-(bBox.x+bBox.width/2)
		// var y = (window.innerHeight/2)/factor-(bBox.y+bBox.height/2)

		// y /= factor
		// x /= factor

		

		$("#map").css({
			"transform": "scale(" + factor + ") translate(" + x + "px," + y + "px)"
		})
	}
}