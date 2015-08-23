var state = {
	country: undefined
}

$(function() {
	handlers()
	initDonut()
	initLabels()

})

function handlers() {

	$("#title").click(function() {
		location.hash = ""

	})

	$("#select").click(function() {
		$("#countries").show()
		$("#countries").html('')
		$("#overlay").show()


		countries.name.forEach(function(country, index) {

			if (stateById.get(countries.iso3[index]) && wmById.get(countries.iso3[index])) {
				$("#countries").append("<div iso='" + countries.iso2[index] + "'>" + country + "</div>")
			}
		})

		$("#countries div").click(function() {
			location.hash = $(this).attr("iso")
			$("#overlay").hide()
			$("#countries").hide()
			if (location.hash.split("#")[1]) {
				$(".label, svg").css("opacity", 1)
			}

		})

		if (location.hash.split("#")[1]) {
			$(".label, svg").css("opacity", .2)
			$("#countries [iso='" + location.hash.split("#")[1] + "']").addClass("selected")
		}


	})

	$("#overlay").click(function() {
		$("#overlay").hide()
		$("#countries").hide()
		if (location.hash.split("#")[1]) {
			$(".label, svg").css("opacity", 1)
		}
	})

	$(window).on("hashchange", function(e) {
		$("#labels").show()
		if (location.hash.split("#")[1]) {
			focusCountry(location.hash.split("#")[1])
			$("#labels").css({
				"pointer-events": "all",
			})
			$(".outer, .inner").css({
				opacity: 1,
				"pointer-events": "all"
			})
		} else {
			resetView()
			$("#labels").css({
				opacity: 0,
				"pointer-events": "none"
			})
			$(".outer, .inner").css({
				opacity: 0,
				"pointer-events": "none"
			})
		}

	})
}