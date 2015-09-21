 var map;

 function initMap() {
 	var zoom = 2
 	if(window.innerHeight>1080)
 		zoom = 3


 	map = new google.maps.Map(document.getElementById('map'), {
 		center: {
 			lat: 30,
 			lng: 0
 		},
 		zoom: zoom,
 		disableDefaultUI: true,
 		scrollwheel: false,
 		navigationControl: false,
 		mapTypeControl: false,
 		scaleControl: false,
 		draggable: false,
 	});

 	var styledMap = new google.maps.StyledMapType(styles, {
 		name: "Styled Map"
 	});

 	map.mapTypes.set('map_style', styledMap);
 	map.setMapTypeId('map_style');

 	map.addListener('click', function(e) {
 		var geocoder = new google.maps.Geocoder();
 		if (geocoder) {
 			geocoder.geocode({
 				'location': e.latLng
 			}, function(results, status) {
 				if (status === google.maps.GeocoderStatus.OK) {
 					if (results[1]) {
 						location.hash=getCountry(results).short_name
 					} else {
 						location.hash=""
 					}
 				} else {
 					console.debug('Geocoder failed due to: ' + status)
 					if (status != "OVER_QUERY_LIMIT") {
 						location.hash=""
 					}
 				}
 			});
 		}
 	})

 	if (location.hash.split("#")[1]) {
		focusCountry(location.hash.split("#")[1])
	}
 }

 function focusCountry(iso2) {
 	$("#select .select").text(countries.name[countries.iso2.indexOf(iso2)])
 	var geocoder = new google.maps.Geocoder();
 	if (geocoder) {
 		geocoder.geocode({
 			'address': countries.name[countries.iso2.indexOf(iso2)]
 		}, function(results, status) {
 			if (status == google.maps.GeocoderStatus.OK) {
 				map.fitBounds(results[0].geometry.viewport);
 			}
 		});
 	}
 }

 function getCountry(results) {
 	var geocoderAddressComponent, addressComponentTypes, address;
 	for (var i in results) {
 		geocoderAddressComponent = results[i].address_components;
 		for (var j in geocoderAddressComponent) {
 			address = geocoderAddressComponent[j];
 			addressComponentTypes = geocoderAddressComponent[j].types;
 			for (var k in addressComponentTypes) {
 				if (addressComponentTypes[k] == 'country') {
 					return address;
 				}
 			}
 		}
 	}
 	return 'Unknown';
 }

 function resetView(){
 	map.panTo({
 		lat: 30,
 		lng: 0
 	})
 	var zoom = 2
 	if(window.innerHeight>1080)
 		zoom = 3
 	map.setZoom(zoom)
 	$("#select .select").text("Country")
 }

 // Styles
 var styles = [{
 	"featureType": "water",
 	"elementType": "labels",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "road",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "poi",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "administrative.locality",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "administrative.country",
 	"elementType": "labels",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "administrative.province",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "transit",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "landscape",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "administrative",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }, {
 	"featureType": "administrative.country",
 	"elementType": "geometry",
 	"stylers": [{
 		"visibility": "on"
 	}]
 }, {
 	"featureType": "administrative.country",
 	"stylers": [{
 		"color": "#FFC7E6"
 	},{
 		"weight": 1.4
 	}]
 }, {
 	"featureType": "water",
 	"stylers": [{
 		"color": "#B1F3DC"
 	}]
 }, {
 	"featureType": "landscape",
 	"elementType": "geometry",
 	"stylers": [{
 		"visibility": "on"
 	}, {
 		"color": "#FFEDF7"
 	}]
 }, {
 	"featureType": "administrative",
 	"elementType": "labels.text.fill",
 	"stylers": [{
 		"visibility": "off"
 	}]
 }]