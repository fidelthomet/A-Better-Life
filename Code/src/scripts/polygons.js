function drawPolygons() {
	var angle = 2 * Math.PI / 11,
		width = window.innerWidth,
		height = window.innerHeight,
		radius = Math.min(width * .6, height * .6) / 2;

	radius -= 30
	radius /= 2

	var bliColors = {
		ho: "rgb(51, 165, 148)",
		iw: "rgb(30, 162, 226)",
		je: "rgb(25, 126, 191)",
		sc: "rgb(219, 76, 96)",
		es: "rgb(127, 173, 62)",
		eq: "rgb(33, 165, 84)",
		cg: "rgb(222, 170, 0)",
		hs: "rgb(126, 56, 116)",
		sw: "rgb(229, 99, 47)",
		ps: "rgb(96, 96, 96)",
		wl: "rgb(153, 40, 37)"
	}

	var defs = d3.select("svg")
		.append('defs')

	bliCodes.forEach(function(bliValue, index) {
		var indexBefore = (index + 10) % 11
		var indexAfter = (index + 12) % 11


		var gradient = defs.append('linearGradient').attr('id', 'grad' + bliValue).attr('gradientUnits', 'objectBoundingBox')



		if (index < 2) {
			gradient.attr("x1", 0).attr("y1", 0).attr("x2", 1).attr("y2", 0)
		} else if (index < 5) {
			gradient.attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1)
		} else if (index < 8) {
			gradient.attr("x1", 1).attr("y1", 0).attr("x2", 0).attr("y2", 0)
		} else {
			gradient.attr("x1", 0).attr("y1", 1).attr("x2", 0).attr("y2", 0)
		}


		gradient.append('stop').attr("offset", "0%").attr("stop-color", bliColors[bliCodes[indexBefore].toLowerCase()])
		gradient.append('stop').attr("offset", "100%").attr("stop-color", bliColors[bliCodes[index].toLowerCase()])



	})

	var poly = d3.select("svg")
		.append("g")
		.attr("class", "poly")

	for (var i = 0; i < 11; i++) {
		var width= .5;
		if(!(i%5)){
			width= 1.5;
		}
		poly.append("circle")
		.attr("cx", window.innerWidth / 2)
		.attr("cy", window.innerHeight / 2)
		.attr("r", Math.round(radius+radius/10*i))
		.attr("stroke-width", width)


	};

	groups.forEach(function(country) {
		bliCodes.forEach(function(bliValue, index) {
			var indexBefore = (index + 10) % 11
			var indexAfter = (index + 12) % 11

			if(country=="CHE"){
				console.log(bliValue+"--"+bliById.get(country)[bliCodes[index]])
			}

			var pos0 = angleToPos(window.innerWidth / 2, window.innerHeight / 2, angle * indexBefore - Math.PI / 2, radius + radius * .1 * bliById.get(country)[bliCodes[indexBefore]])
			var d = "M" + Math.round(pos0[0]) + "," + Math.round(pos0[1])

			var pos1 = angleToPos(window.innerWidth / 2, window.innerHeight / 2, angle * index - Math.PI / 2, radius + radius * .1 * bliById.get(country)[bliCodes[index]])
			if (Math.round(pos0[0]) == Math.round(pos1[0])) {
				pos1[0]++;
			}

			if (Math.round(pos0[1]) == Math.round(pos1[1])) {
				pos1[1]++;
			}

			d += "L" + Math.round(pos1[0]) + "," + Math.round(pos1[1])

			// pos = angleToPos(window.innerWidth / 2, window.innerHeight / 2, angle * indexAfter, radius + radius * .1 * bliById.get(country)[bliCodes[indexAfter]])
			// d += "L" + pos[0] + "," + pos[1]


			poly.append("path")
				.attr("d", d)
				.attr("iso3", country)
				.attr("stroke", "url(#grad" + bliValue + ")")


		})
	})


	var circleSvg = d3.select("svg")
			.append("g")
			.attr("class", "circles")

	bliCodes.forEach(function(bliValue, index) {
		var pos = angleToPos(window.innerWidth / 2, window.innerHeight / 2, angle * index - Math.PI / 2, radius+radius/10*index)

		circleSvg.append("circle")
		.attr("fill", bliColors[bliValue.toLowerCase()])
		.attr("cx", Math.round(pos[0]))
		.attr("cy", Math.round(pos[1]))
		.attr("r", 5)
		.attr("bli", bliValue)


	})

	if(location.hash.split("#")[1]){
		$(".circles, .poly").css({
				opacity: 1,
				"pointer-events": "all"
			})
	}

	$(".circles circle").mouseover(function(){
		
		$("body").append($('<div id="bliLabel" class="text">'+bliNames[$(this).attr("bli")]+'</div>').css({
			left: (this.getBBox().x-5)+"px",
			top: (this.getBBox().y-25)+"px",
			background: "#FFEDF7"
		}))
		console.log("huhu")
	})
	$(".circles circle").mouseout(function(){
		$("#bliLabel").remove()
	})
}