var state = {
	country: undefined
}

var intro = 0;

var bliNames = {
	CG: "Civic Engagement",
	SC: "Community",
	ES: "Education",
	EQ: "Environment ",
	HS: "Health",
	HO: "Housing",
	IW: "Income",
	JE: "Jobs",
	SW: "Life Satisfaction",
	PS: "Security",
	WL: "Work Life Balnce"
}

$(function() {
	handlers()
	initDonut()
	initLabels()

	$("#intro0").show()
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
		if (intro==1) {
			intro++;
		} else if(intro > 1){
			$("#intro").hide()
		}
		$("#labels").show()
		if (location.hash.split("#")[1]) {
			focusCountry(location.hash.split("#")[1])
			$("#labels").css({
				"pointer-events": "all",
			})
			$(".outer, .inner, .circles, .poly").css({
				opacity: 1,
				"pointer-events": "all"
			})
		} else {
			resetView()
			$("#labels").css({
				opacity: 0,
				"pointer-events": "none"
			})
			$(".outer, .inner, .circles, .poly").css({
				opacity: 0,
				"pointer-events": "none"
			})
		}

	})
}

function skip(){
	$("#intro").hide()
}

function con(number){
	$("#intro"+(number-1)).hide()
	if($("#intro"+number).length){
		$("#intro"+number).show()

		if(number==1){
			location.hash="BR"
		}
		if(number==2){
			$(".outer [iso3='PRT']").trigger("mouseover")
			$(".circles [bli='ES']").trigger("mouseover")
			$(".circles [bli='HS']").trigger("mouseover")
			$(".circles [bli='SW']").trigger("mouseover")
		}
		if(number==3){
			$(".outer [iso3='PRT']").trigger("mouseout")
			$(".circles [bli='ES']").trigger("mouseout")
			$(".circles [bli='HS']").trigger("mouseout")
			$(".circles [bli='SW']").trigger("mouseout")
			location.hash=""
			intro = 1
			$("#intro").css("pointer-events","none")
		}

	} else {
		skip()
	}
}