var bliCodes = ["CG", "SC", "ES", "EQ", "HS", "HO", "IW", "JE", "SW", "PS", "WL"]

matchBLIxWM()

function matchBLIxWM() {


	d3.csv("data/bli.csv", function(error, bli) {
		if (error) throw error

		d3.csv("data/whatmatters.csv", function(error, wm) {
			if (error) throw error

			var response = "Country"

			wm.forEach(function(wmCountry) {
				response += "," + wmCountry.CountryCode
			})


			bli.forEach(function(bliCountry) {
				response += "\n" + bliCountry.CountryCode
				wm.forEach(function(wmCountry) {

					
					var match = 0

					bliCodes.forEach(function(bliCode) {
						match += parseFloat(wmCountry[bliCode])*parseFloat(bliCountry[bliCode])
					})
					response += ","+match
				})
			})

			console.log(response)
		})
	})
}