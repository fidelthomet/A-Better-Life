var bliCodes = ["CG", "SC", "ES", "EQ", "HS", "HO", "IW", "JE", "SW", "PS", "WL"]
var countryCodes = {
	AFG: "Afghanistan",
	AGO: "Angola",
	ALB: "Albania",
	AND: "Andorra",
	ARE: "United Arab Emirates",
	ARG: "Argentina",
	ARM: "Armenia",
	ATG: "Antigua and Barbuda",
	AUS: "Australia",
	AUT: "Austria",
	AZE: "Azerbaijan",
	BDI: "Burundi",
	BEL: "Belgium",
	BEN: "Benin",
	BFA: "Burkina Faso",
	BGD: "Bangladesh",
	BGR: "Bulgaria",
	BHR: "Bahrain",
	BHS: "Bahamas",
	BIH: "Bosnia and Herzegovina",
	BLR: "Belarus",
	BLZ: "Belize",
	BMU: "Bermuda",
	BOL: "Bolivia",
	BRA: "Brazil",
	BRB: "Barbados",
	BRN: "Brunei Darussalam",
	BSX: "Baltic states",
	BTN: "Bhutan",
	BWA: "Botswana",
	CAF: "Central African Republic",
	CAN: "Canada",
	CAX: "Caribbean",
	CGX: "Caribbean and Guyana",
	CHE: "Switzerland",
	CHL: "Chile",
	CHN: "China",
	CIV: "Côte d'Ivoire",
	CMR: "Cameroon",
	COD: "Democratic Republic of the Congo",
	COG: "Congo",
	COK: "Cook Islands",
	COL: "Colombia",
	COM: "Comoros",
	CPV: "Cape Verde",
	CRI: "Costa Rica",
	CSK: "Former Czechoslovakia",
	CUB: "Cuba",
	CYP: "Cyprus",
	CZE: "Czech Republic",
	DEU: "Germany",
	DJI: "Djibouti",
	DMA: "Dominica",
	DNK: "Denmark",
	DOM: "Dominican Republic",
	DZA: "Algeria",
	ECU: "Ecuador",
	EGY: "Egypt",
	ERI: "Eritrea",
	ESP: "Spain",
	EST: "Estonia",
	ETH: "Ethiopia",
	FIN: "Finland",
	FJI: "Fiji",
	FRA: "France",
	FSM: "Micronesia",
	GAB: "Gabon",
	GBR: "United Kingdom",
	GEO: "Georgia",
	GHA: "Ghana",
	GIN: "Guinea",
	GMB: "Gambia",
	GNB: "Guinea-Bissau",
	GNQ: "Equatorial Guinea",
	GRC: "Greece",
	GRD: "Grenada",
	GTM: "Guatemala",
	GUM: "Guam",
	GUY: "Guyana",
	HKG: "Hong Kong, China",
	HND: "Honduras",
	HRV: "Croatia",
	HTI: "Haiti",
	HUN: "Hungary",
	IDN: "Indonesia",
	IND: "India",
	IRL: "Ireland",
	IRN: "Iran",
	IRQ: "Iraq",
	ISL: "Iceland",
	ISR: "Israel",
	ITA: "Italy",
	JAM: "Jamaica",
	JOR: "Jordan",
	JPN: "Japan",
	KAZ: "Kazakhstan",
	KEN: "Kenya",
	KGZ: "Kyrgyzstan",
	KHM: "Cambodia",
	KIR: "Kiribati",
	KNA: "Saint Kitts and Nevis",
	KOR: "Korea",
	KWT: "Kuwait",
	LAO: "Laos",
	LBN: "Lebanon",
	LBR: "Liberia",
	LBY: "Libya",
	LCA: "Saint Lucia",
	LIE: "Liechtenstein",
	LKA: "Sri Lanka",
	LSO: "Lesotho",
	LTU: "Lithuania",
	LUX: "Luxembourg",
	LVA: "Latvia",
	MAC: "Macau",
	MAR: "Morocco",
	MCO: "Monaco",
	MDA: "Moldova",
	MDG: "Madagascar",
	MDV: "Maldives",
	MEX: "Mexico",
	MHL: "Marshall Islands",
	MKD: "Former Yug. Rep. of Macedonia",
	MLI: "Mali",
	MLT: "Malta",
	MMR: "Myanmar",
	MNE: "Montenegro",
	MNG: "Mongolia",
	MOZ: "Mozambique",
	MRT: "Mauritania",
	MUS: "Mauritius",
	MWI: "Malawi",
	MYS: "Malaysia",
	NAM: "Namibia",
	NER: "Niger",
	NGA: "Nigeria",
	NIC: "Nicaragua",
	NIU: "Niue",
	NLD: "Netherlands",
	NOR: "Norway",
	NPL: "Nepal",
	NRU: "Nauru",
	NS: "Not stated",
	NZL: "New Zealand",
	OMN: "Oman",
	PAK: "Pakistan",
	PAN: "Panama",
	PER: "Peru",
	PHL: "Philippines",
	PLW: "Palau",
	PNG: "Papua New Guinea",
	POL: "Poland",
	PRI: "Puerto Rico",
	PRK: "Democratic People's Republic of Korea",
	PRT: "Portugal",
	PRY: "Paraguay",
	PSE: "Palestinian administrative areas",
	QAT: "Qatar",
	ROU: "Romania",
	RUS: "Russian Federation",
	RWA: "Rwanda",
	SAU: "Saudi Arabia",
	SCG: "Serbia and Montenegro",
	SDN: "Sudan",
	SEN: "Senegal",
	SGP: "Singapore",
	SLB: "Solomon Islands",
	SLE: "Sierra Leone",
	SLV: "El Salvador",
	SMR: "San Marino",
	SOM: "Somalia",
	SRB: "Serbia",
	SSD: "South Sudan",
	STP: "Sao Tome and Principe",
	SUN: "Former USSR",
	SUR: "Suriname",
	SVK: "Slovak Republic",
	SVN: "Slovenia",
	SWE: "Sweden",
	SWZ: "Swaziland",
	SYC: "Seychelles",
	SYR: "Syria",
	TCD: "Chad",
	TGO: "Togo",
	THA: "Thailand",
	TJK: "Tajikistan",
	TKL: "Tokelau",
	TKM: "Turkmenistan",
	TLS: "Timor-Leste",
	TON: "Tonga",
	TOT: "Total",
	TTO: "Trinidad and Tobago",
	TUN: "Tunisia",
	TUR: "Turkey",
	TUV: "Tuvalu",
	TWN: "Chinese Taipei",
	TZA: "Tanzania",
	UGA: "Uganda",
	UKR: "Ukraine",
	URY: "Uruguay",
	USA: "United States",
	UUU: "Unknown",
	UZB: "Uzbekistan",
	VCT: "Saint Vincent and the Grenadines",
	VEN: "Venezuela",
	VNM: "Viet Nam",
	VUT: "Vanuatu",
	WSM: "Samoa",
	YEM: "Yemen",
	YUCS: "Former Yugoslavia",
	YYY: "Stateless",
	ZAF: "South Africa",
	ZMB: "Zambia",
	ZWE: "Zimbabwe"
}

// matchBLIxWM()
// emigrationPercentage()
immigrationPercentage()

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
					wmCountry[bliCode] = parseFloat(wmCountry[bliCode]) / normalize
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

function emigrationPercentage() {

	d3.csv("data/migration.csv", function(error, mi) {

		var totalEmigration = {}

		var response = "Country"


		mi.forEach(function(miCountry) {

			for (var emCountry in miCountry) {
				if (!isNaN(miCountry[emCountry])) {
					if (!totalEmigration[emCountry]) {
						totalEmigration[emCountry] = 0
					}

					totalEmigration[emCountry] += parseFloat(miCountry[emCountry])
				}
			}
		})

		for (var emCountry in mi[0]) {
			if (totalEmigration[emCountry]) {
				response += "," + emCountry
			}
		}


		mi.forEach(function(miCountry) {
			response += "\n" + miCountry.Country
			for (var emCountry in miCountry) {
				if (totalEmigration[emCountry]) {
					if (!isNaN(miCountry[emCountry])) {
						response += "," + (parseFloat(miCountry[emCountry]) / totalEmigration[emCountry])
					} else {
						response += "," + 0
					}
				}
			}
		})

		console.log(response)
	})
}


function immigrationPercentage() {

	d3.csv("data/migration.csv", function(error, mi) {

		var response = "Country"

		for (var emCountry in mi[0]) {
			if (emCountry != "Country") {
				response += "," + emCountry
			}
		}

		mi.forEach(function(miCountry) {
			response += "\n" + miCountry.Country

			for (var emCountry in miCountry) {
				if (emCountry != "Country") {
					if (!isNaN(miCountry[emCountry])) {

						response += "," + (parseFloat(miCountry[emCountry]) / parseFloat(miCountry.TOT))
					} else {
						response += "," + 0
					}
				}

			}
		})

		console.log(response)
	})
}