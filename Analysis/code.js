var bliCodes = ["CG", "SC", "ES", "EQ", "HS", "HO", "IW", "JE", "SW", "PS", "WL"]

matchBLIxWM()

function matchBLIxWM() {


	d3.csv("data/bli.csv", function(error, bli) {
		if (error) throw error

		d3.tsv("http://www.oecdbetterlifeindex.org/bli/rest/indexes/stats/country", function(error, wm) {
			if (error) throw error

			var response = "Country"

			wm.forEach(function(wmCountry) {
				response += "," + wmCountry.country

				var normalize = 0

				bliCodes.forEach(function(bliCode) {
					normalize += parseFloat(wmCountry[bliCode])
				})

				bliCodes.forEach(function(bliCode) {
					wmCountry[bliCode]=parseFloat(wmCountry[bliCode])/normalize
				})

			})


			bli.forEach(function(bliCountry) {
				response += "\n" + bliCountry.CountryCode
				wm.forEach(function(wmCountry) {



					var match = 0

					bliCodes.forEach(function(bliCode) {
						match += wmCountry[bliCode] * parseFloat(bliCountry[bliCode])
					})
					response += "," + match
				})
			})

			console.log(response)
		})
	})
}