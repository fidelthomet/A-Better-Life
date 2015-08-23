	var dispatch = d3.dispatch("load", "statechange");

	var bliCodes = ["CG", "SC", "ES", "EQ", "HS", "HO", "IW", "JE", "SW", "PS", "WL"]

	var groups = [
		"AUS", "AUT", "BEL", "CAN", "CHL", "CZE", "EST", "FIN", "FRA", "DEU", "HUN", "ISL", "IRL", "ISR", "ITA", "JPN", "KOR", "LUX", "MEX", "NLD", "NZL", "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE", "GBR", "USA", "RUS"
	];

	var stateById, bliById, wmById

	function initDonut() {
		var dataPromises = []

		dataPromises.push(new Promise(function(resolve, reject) {
			d3.csv("data/migration.csv", type, function(error, states) {
				if (error) throw error;
				stateById = d3.map();
				states.forEach(function(d) {
					stateById.set(d.id, d);
				});
				resolve()
			})
		}))

		dataPromises.push(new Promise(function(resolve, reject) {
			d3.csv("data/bli.csv", type, function(error, bliStates) {
				if (error) throw error;
				bliById = d3.map();
				bliStates.forEach(function(d) {
					bliById.set(d.CountryCode, d);
				});
				resolve()
			})
		}))

		dataPromises.push(new Promise(function(resolve, reject) {
			d3.tsv("http://www.oecdbetterlifeindex.org/bli/rest/indexes/stats/country", function(error, wmStates) {
				if (error) throw error
				wmById = d3.map();
				wmStates.forEach(function(d) {
					wmById.set(d.country, d);
				});
				resolve()
			})
		}))

		Promise.all(dataPromises).then(function() {

			dispatch.load(stateById);
			if (location.hash.split("#")[1]) {
				$(".outer, .inner").css("opacity", 1)

				dispatch.statechange(stateById.get(countries.iso3[countries.iso2.indexOf(location.hash.split("#")[1])]))
			} else {
				// $(".outer, .inner").hide()
				$("#labels").hide()
				$(".outer, .inner").css("pointer-events", "none")
				dispatch.statechange(stateById.get("AUS"))
			}
		})



	}

	function initLabels() {
		groups.forEach(function(lCountry) {
			var label = $("<div class='label text' iso='" + countries.iso2[countries.iso3.indexOf(lCountry)] + "' iso3='" + lCountry + "'>" + countries.name[countries.iso3.indexOf(lCountry)] + "<br/><span class='emigrants'></span><br/><span class='match'></span></div>")
			$("#labels").append(label)
		})

		$(".label").mouseover(function() {
			$(".outer [iso3='" + $(this).attr("iso3") + "']").trigger("mouseover")
		})

		$(".label").mouseout(function() {
			$(".outer [iso3='" + $(this).attr("iso3") + "']").trigger("mouseout")
		})

	}

	// A drop-down menu for selecting a state; uses the "menu" namespace.
	$(window).on("hashchange", function() {
		if (location.hash.split("#")[1]) {


			dispatch.statechange(stateById.get(countries.iso3[countries.iso2.indexOf(location.hash.split("#")[1])]))
		} else {

		}

	})

	// A pie chart to show population by age group; uses the "pie" namespace.
	dispatch.on("load.pie", function(stateById) {
		var width = window.innerWidth,
			height = window.innerHeight,
			radius = Math.min(width * .6, height * .6) / 2;

		var color = d3.scale.ordinal()
			.domain(groups)
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(radius - 20);

		var arc2 = d3.svg.arc()
			.outerRadius(radius - 0)
			.innerRadius(radius - 20);

		var pie = d3.layout.pie()
			.sort(null);

		var pie2 = d3.layout.pie()
			.sort(null);

		var svg = d3.select("body").append("svg")
			.append("g")
			.attr("class", "inner")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var svg2 = d3.select("svg")
			.append("g")
			.attr("class", "outer")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var path = svg.selectAll("path")
			.data(groups)
			.enter().append("path")
			.style("fill", "#152943")
			.style("opacity", function(d) {


			})
			.classed('donut', true)
			.attr("iso3", function(i) {
				return i
			})
			.each(function() {
				this._current = {
					startAngle: 0,
					endAngle: 0
				};
			});

		var path2 = svg2.selectAll("path")
			.data(groups)
			.enter().append("path")
			.style("fill", "#152943")
			.style("opacity", function() {
				return .2 + Math.random() * .8
			})
			.classed('donut', true)
			.attr("iso3", function(i) {
				return i
			})
			.each(function() {
				this._current = {
					startAngle: 0,
					endAngle: 0
				};
			});

		$(".outer .donut").mouseover(function() {
			$(this).css("fill-opacity", "1")
			$(".inner [iso3='" + $(this).attr("iso3") + "']").css("fill-opacity", "0")
			$(".inner [iso3='" + $(this).attr("iso3") + "']").css("stroke-opacity", "0")
			$("#labels .label").css("opacity", .2)
			$("#labels [iso3='" + $(this).attr("iso3") + "']").css({
				opacity: 1,
				"z.index": 200
			});
		})

		$(".outer .donut").mouseout(function() {
			$(this).css("fill-opacity", "0")
			$(".inner [iso3='" + $(this).attr("iso3") + "']").css("fill-opacity", "1")
			$(".inner [iso3='" + $(this).attr("iso3") + "']").css("stroke-opacity", "1")
			$("#labels .label").css("opacity", 1)
			$("#labels [iso='" + $(this).attr("iso3") + "']").css({
				"z.index": 0
			});
		})
		dispatch.on("statechange.pie", function(d) {

			$(".label").css("opacity", 0)

			var normalize = 0
			bliCodes.forEach(function(bliCode) {
				normalize += parseFloat(wmById.get(d.id)[bliCode])
			})

			path.data(pie.value(function(g) {
				return d[g];
			})(groups)).style("opacity", function(ddo) {

				var match = 0
				bliCodes.forEach(function(bliCode) {
					match += (parseFloat(wmById.get(d.id)[bliCode]) / normalize) * parseFloat(bliById.get(ddo.data)[bliCode])
				})
				return ((match / 10 - .1) * 1.25)
			})

			path2.data(pie.value(function(g) {
				return d[g];
			})(groups)).style("opacity", function(ddo) {

				var match = 0
				bliCodes.forEach(function(bliCode) {
					match += (parseFloat(wmById.get(d.id)[bliCode]) / normalize) * parseFloat(bliById.get(ddo.data)[bliCode])
				})
				return ((match / 10 - .1) * 1.25)
			})

			path.data(pie.value(function(g) {

					return d[g];
				})(groups)).transition().duration(800)
				.attrTween("d", function(d) {
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						return arc(interpolate(t));
					};
				})


			path2.data(pie2.value(function(g) {
					return d[g];
				})(groups)).transition().duration(400)
				.attrTween("d", function(d) {
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						return arc2(interpolate(t));
					};
				}).each("end", function(ddo) {

					$("#labels").css({
						"pointer-events": "all",
						opacity: 1
					})
					var dist = ddo.endAngle - ddo.startAngle

					var label = $("#labels [iso='" + countries.iso2[countries.iso3.indexOf(ddo.data)] + "']")

					label.css("opacity", 1)

					var match = 0
					bliCodes.forEach(function(bliCode) {
						match += (parseFloat(wmById.get(d.id)[bliCode]) / normalize) * parseFloat(bliById.get(ddo.data)[bliCode])
					})
					match = ((match / 11) * 100).toFixed(1)

					label.children(".emigrants").html(addSpaces(Math.round(ddo.value * 1000)) + " Emigrants")
					label.children(".match").html(match + "% Match")

					// $("#labels").append(label)
					label.removeClass("center")

					if (dist > .3) {
						var angle = ddo.startAngle + dist / 2

						var offset = [-150, -60]

						if (angle < Math.PI * .5) {
							offset[0] = 0
						} else if (angle < Math.PI) {

							offset[0] = offset[1] = 0
						} else if (angle < Math.PI * 1.5) {
							offset[1] = 0
						}

						angle -= Math.PI / 2

						var pos = angleToPos(window.innerWidth / 2 + offset[0], window.innerHeight / 2 + offset[1], angle, radius + 10)

						label.css({
							left: Math.round(pos[0]) + "px",
							top: Math.round(pos[1]) + "px"
						})


						label.addClass("center")



					}
				});
		});
		$(".outer .donut").each(function(index, item) {
			// console.log($(item).attr("iso3"))
			if (parseFloat($(item).attr("angledist")) > 1) {
				$(item).css("fill-opacity", "1")
			}
		})
	});

	// Coerce population counts to numbers and compute total per state.
	function type(d) {
		d.total = d3.sum(groups, function(k) {
			return d[k] = +d[k];
		});
		return d;
	}

	function addSpaces(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return x1 + x2;
	}

	function angleToPos(xCoord, yCoord, angle, length) {
		return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
	}