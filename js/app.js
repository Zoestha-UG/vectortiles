/*global $ */
$(window).on("scroll", function (event) {
	var scrollValue = $(window).scrollTop();
	if (scrollValue > 220) {
		$(".navbar").addClass("affix");
	} else {
		$(".navbar").removeClass("affix");
	}
});



/*Load location (stores2)*/
var stores2 = (function () {
	stores2 = null;
	$.ajax({
		"async": false,
		"global": false,
		"url": "https://leipzig-einkaufen.de/location.json",
		//"url": "http://localhost/vectortiles/museen.json",
		"dataType": "json",
		"success": function (data) {
			stores2 = data;
		}
	});
	return stores2;
})();

// declare map
var map = new mapboxgl.Map({

	container: "map",
	style: "https://leipzig-einkaufen.de/json/style-local.json",
	//style: "http://localhost/vectortiles/json/style-local.json",

	center: [12.3722, 51.3272],
	zoom: 11,
	attributionControl: true,
	hash: false,
	maxZoom: 14.9
});

/*Declare MapDirections*/

var mapDirections = new MapboxDirections();
/*MapDirections Settings*/
mapDirections.accessToken = "pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig";
mapDirections.unit = "metric";
mapDirections.proximity = false; /*proximity ??*/
mapDirections.interactive = false;
mapDirections.profile = "driving"; //, "walking", "cycling";
// UI controls
mapDirections.controls = {
	inputs: true,
	instructions: false
};

/*Add mapDirections Controls*/
map.addControl(new MapboxDirections(mapDirections), "top-left");

map.addControl(new mapboxgl.ScaleControl({
	maxWidth: 80,
	unit: "metric"
}));

var directionControl = document.getElementsByClassName("mapboxgl-ctrl-directions");
directionControl["0"].hidden = true;
var ptsWithin = null;

// Create a popup (but don't add it to the map yet)
var popup = new mapboxgl.Popup({
	closeButton: false
});

var filterEl = document.getElementById("feature-filter");
var listings = document.getElementById("listings");
var txtCategories = document.getElementById("txtCategories");

// Empty Geojson Data
var bufferedLinestring = {
	"id": "0",
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [0, 0]
	},
	"properties": {}
};

// Functions
function normalize(string) {
	return string.trim().toLowerCase();
}

function createPopUp(currentFeature) {

	var popup = new mapboxgl.Popup({
			closeOnClick: true
		})
		.setLngLat(currentFeature.geometry.coordinates)
		.setHTML("<h3>" + currentFeature.properties.name + "</h3>" +
			"<h4>" + currentFeature.properties.description + "</h4>")
		.addTo(map);
}

function getUniqueFeatures(array, comparatorProperty) {

	var existingFeatureKeys = {};
	// Because features come from tiled vector data, feature geometries may be split
	// or duplicated across tile boundaries and, as a result, features may appear
	// multiple times in query results.
	var uniqueFeatures = array.filter(function (el) {
		if (existingFeatureKeys[el.properties[comparatorProperty]]) {
			return false;
		} else {
			existingFeatureKeys[el.properties[comparatorProperty]] = true;
			return true;
		}
	});

	return uniqueFeatures;
}

function colorLocationList(data) {

	// Iterate through the list of stores
	// WITHIN THE CALCULATED ROUTE !! and color in green
	if (data.length) {
		data.forEach(function (feature) {

			// Shorten data.feature.properties to just `prop`.
			var prop = feature.properties;
			var cardHeader = document.getElementById("heading" + prop.id);
			if (cardHeader === null) {
				return;
			}

			var cardTitle = cardHeader.getElementsByClassName("title");
			cardTitle[0].style.color = "#608BC7";

		});
	}
}

function buildLocationList(data) {
	// Iterate through the list of stores
	listings.innerHTML = "";
	if (data.length) {
		data.forEach(function (feature) {

			// Shorten data.feature.properties to just `prop` so we're not writing this long form over and over again.
			var prop = feature.properties;

			// Select the listing container in the HTML and append a div  with the class 'item' for each store
			var card = listings.appendChild(document.createElement("div"));
			card.className = "item card cardList";
			card.id = prop.id;

			var cardHeader = card.appendChild(document.createElement("div"));
			cardHeader.className = "card-header";
			cardHeader.setAttribute("role", "tab");

			cardHeader.setAttribute("id", "heading" + card.id);
			cardHeader.id = "heading" + card.id;

			var cardMb0 = cardHeader.appendChild(document.createElement("h5"));
			cardMb0.className = "mb-0";

			// Create a new link with the class 'title' for each store and fill it with the store address
			var link = cardMb0.appendChild(document.createElement("a"));
			link.setAttribute("data-toggle", "collapse");
			link.href = "#collapse" + card.id;
			link.setAttribute("aria-expanded", "false");
			link.setAttribute("aria-controls", "collapse" + card.id);
			link.className = "title";
			link.textContent = prop.name;
			link.dataPosition = card.id;

			var cardCollapse = card.appendChild(document.createElement("div"));
			cardCollapse.className = "collapse";
			cardCollapse.setAttribute("id", "collapse" + card.id);
			cardCollapse.setAttribute("role", "tabpanel");
			cardCollapse.setAttribute("aria-labelledby", "heading" + card.id);
			cardCollapse.setAttribute("data-parent", "#listings");

			if (prop.image) {
				var cardImg = cardCollapse.appendChild(document.createElement("img"));
				cardImg.className = "img-responsive img-listing";
				cardImg.src = prop.image;
				cardImg.alt = prop.name;
				cardImg.title = prop.name;
			}

			var cardBody = cardCollapse.appendChild(document.createElement("div"));
			cardBody.className = "card-body";
			cardBody.textContent = prop.description;
			cardBody.appendChild(document.createElement("br"));
			
			if (prop.url) {
				var linkBody = cardBody.appendChild(document.createElement("a"));
				linkBody.textContent = prop.name;
				linkBody.href = prop.url;
				linkBody.target = "_blank";
				linkBody.title = prop.name;
			}

			// Add an event listener for the links in the sidebar listing
			link.addEventListener("click", function (e) {
				// Update the currentFeature to the store associated with the clicked link
				var clickedListing = stores2.features[this.dataPosition];

				var popUps = document.getElementsByClassName("mapboxgl-popup");
				// Check if there is already a popup on the map and if so, remove it
				if (popUps[0]) {
					popUps[0].parentNode.removeChild(popUps[0]);
				}

				// 1. Close all other popups and display popup for clicked store
				createPopUp(clickedListing);

				// 2. Highlight listing in sidebar (and remove highlight for all other listings)
				var activeItem = document.getElementsByClassName("is-active");
				if (activeItem[0]) {
					activeItem[0].classList.remove("is-active");
				}
				this.classList.add("is-active");

			});

		});

	} else {
		var empty = document.createElement("p");
		empty.textContent = "Ziehen Sie die Karte, um die Ergebnisse zu füllen";
		listings.appendChild(empty);

		// remove features filter
		map.setFilter("locations", ["has", "Categories"]);
	}


	// Populate features for the listing overlay.
	if (ptsWithin) {
		colorLocationList(ptsWithin.features);
	}
}

function filterOnRoute() {

	var mapDirectionsSource = map.getSource("directions");
	var radius = 0.6;
	var unit = "kilometers";

	//var distDuration = mapDirections.getDistanceAndDuration();

	// buffer the route with a area of radius 'radius'
	if (mapDirectionsSource._data.features.length < 2) {
		return;
	}
	var bufferedLinestring = turf.buffer(mapDirectionsSource._data.features[2].geometry, radius, {
		units: unit
	});

	// update bufferedTraceSource
	map.getSource("bufferedTraceSource").setData(bufferedLinestring);

	// Get locations rendered on the map
	var features = map.queryRenderedFeatures({
		layers: ["locations"]
	});

	// use featureCollection to convert features (array of features) into a collection of features (Object type FeatureCollection);
	var collection = turf.featureCollection(features);

	// Filter the points to the area around the direction
	ptsWithin = turf.pointsWithinPolygon(collection, bufferedLinestring);

	// Populate features for the listing overlay.
	if (ptsWithin) {
		buildLocationList(features);
	}
}

function displayDirectionControls() {

	var directionControl = document.getElementsByClassName("mapboxgl-ctrl-directions");
	if (directionControl["0"].hidden) {
		directionControl["0"].hidden = false;
		map.setLayoutProperty("bufferedTraceLayer", "visibility", "visible");

		map.setLayoutProperty("directions-origin-point", "visibility", "visible");
		map.setLayoutProperty("directions-destination-point", "visibility", "visible");
		map.setLayoutProperty("directions-origin-label", "visibility", "visible");
		map.setLayoutProperty("directions-destination-label", "visibility", "visible");

		map.setLayoutProperty("directions-hover-point", "visibility", "visible");
		map.setLayoutProperty("directions-waypoint-point", "visibility", "visible");
		map.setLayoutProperty("directions-route-line", "visibility", "visible");
		map.setLayoutProperty("directions-route-line-alt", "visibility", "visible");
		filterOnRoute();
	} else {
		directionControl["0"].hidden = true;
		// reinitialize ptsWithin
		ptsWithin = null;

		map.setLayoutProperty("bufferedTraceLayer", "visibility", "none");
		map.setLayoutProperty("directions-origin-point", "visibility", "none");
		map.setLayoutProperty("directions-destination-point", "visibility", "none");
		map.setLayoutProperty("directions-origin-label", "visibility", "none");
		map.setLayoutProperty("directions-destination-label", "visibility", "none");

		map.setLayoutProperty("directions-hover-point", "visibility", "none");
		map.setLayoutProperty("directions-waypoint-point", "visibility", "none");
		map.setLayoutProperty("directions-route-line", "visibility", "none");
		map.setLayoutProperty("directions-route-line-alt", "visibility", "none");

		var features = map.queryRenderedFeatures({
			layers: ["locations"]
		});

		if (features) {
			// Populate features for the listing overlay.
			buildLocationList(features);
		}
	}
}


// Call buildlist function on initialization
buildLocationList(stores2.features);

// Load map
map.on("load", function (e) {

	//map.loadImage('http://localhost/vectortiles/media/diagonal-noise.png', function(error, image) {
	map.loadImage("https://leipzig-einkaufen.de/media/diagonal-noise.png", function (error, image) {

		if (error) throw error;
		map.addImage("background_pattern", image);
	});

	//map.loadImage('http://localhost/vectortiles/media/Marker_with_Shadow.png', function(error, image) {
	map.loadImage("https://leipzig-einkaufen.de/media/Marker_with_Shadow.png", function (error, image) {

		if (error) throw error;
		map.addImage("marker_z", image);

		// Add the stores2 (locations_source) to the map
		map.addSource("locations_source", {
			"type": "geojson",
			"data": stores2
		});

		// Add the locations_source to the map as a layer
		map.addLayer({
			"id": "locations",
			"type": "symbol",
			// Add a GeoJSON source containing place coordinates and information.
			"source": "locations_source",
			"layout": {
				"visibility": "visible",
				"icon-image": "marker_z",
				"icon-size": 0.9,
				"icon-allow-overlap": true
			}
		});

		// Add the bufferedLinestring to the map as a layer
		map.addSource("bufferedTraceSource", {
			"type": "geojson",
			"data": bufferedLinestring,
			"maxzoom": 13
		});
		map.addLayer({
			"id": "bufferedTraceLayer",
			"type": "fill",
			"source": "bufferedTraceSource",
			"layout": {
				"visibility": "visible"
			},
			"paint": {
				"fill-color": "rgb(0,0,0)",
				"fill-opacity": 1,
				"fill-translate": [
          0,
          2.5
        ],
				"fill-pattern": "background_pattern"
			}

		});

		// Add Fullscreen control to the map.
		map.addControl(new mapboxgl.FullscreenControl());

		// Add geolocate control to the map.
		map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		}));

		// When a click event occurs on a feature in the places layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		map.on("click", "locations", function (e) {
			var currentFeature = e.features[0];
			// 1. Create Popup
			createPopUp(currentFeature);

			// 2. Highlight listing in sidebar (and remove highlight for other listing)
			var activeItem = document.getElementsByClassName("is-active");
			if (activeItem[0]) {
				activeItem[0].classList.remove("is-active");
			}

			var headingElement = document.getElementById("heading" + currentFeature.properties.id);
			if (headingElement) {
				headingElement.classList.add("is-active");
			}
			var collapseElement = document.getElementById("collapse" + currentFeature.properties.id);
			if (collapseElement) {
				$(collapseElement).collapse("show");
			}

		});

		map.on("moveend", function () {
			// Query all the rendered points in the view
			var features = map.queryRenderedFeatures({
				layers: ["locations"]
			});

			if (features) {

				//var uniqueFeatures = getUniqueFeatures(features, "Categories");

				// Populate features for the listing overlay.
				buildLocationList(features);

				// Clear the input container
				filterEl.value = "";

				// Store the current features in sn `locations_on_map` variable to later use for filtering on `keyup`.
				locations = features;
			}
		});

		map.on("mousemove", "locations", function (e) {
			// Change the cursor style as a UI indicator.
			map.getCanvas().style.cursor = "pointer";

		});

		map.on("mouseleave", "locations", function () {
			map.getCanvas().style.cursor = "";
			popup.remove();
		});

		$(".dropdown-item").click(function () {

			var value = normalize($(this).text());

			var filtered = map.querySourceFeatures("locations_source");
			if (value !== "alle") {
				// Filter visible features that don't match the input value.
				filtered = filtered.filter(function (feature) {
					var name = normalize(feature.properties.name);
					var Categories = normalize(feature.properties.Categories);
					return name.indexOf(value) > -1 || Categories.indexOf(value) > -1;
				});
			}
			if (!filtered) {
				return;
			}


			var uniqueFeatures = getUniqueFeatures(filtered, "Categories");
			// Populate the sidebar with filtered results
			buildLocationList(uniqueFeatures);

			// Set the filter to populate features into the layer.
			map.setFilter("locations", ["in", "name"].concat(uniqueFeatures.map(function (feature) {
				return feature.properties.name;
			})));


			txtCategories.value = value;

		});
	});
});

// Direction event listener
mapDirections.on("route", function (e) {
	filterOnRoute();
});

// Display Direction
$("#btnDisplayControls").on("click", function (e) {
	displayDirectionControls();
});
