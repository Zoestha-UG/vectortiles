mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');

var stores = {

    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.373325, 51.323350]
            },
            "properties": {
                "name": "Café Maître und Pâtisserie",
                "popupContent": "<b>Café Maître</b><br />Karl-Liebknecht-Straße 62 04275 Leipzig",
                "address": "Karl-Liebknecht-Straße 62",
                "city": " Leipzig",
                "country": "Germany",
                "postalCode": "04275",
                "website": "www.cafe-maitre.de/",
                "Categories": "Cafe, patisserie"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3688696, 51.3161980]
            },
            "properties": {
                "name": "Bio am Fockeberg",
                "popupContent": "<b>Bio am Fockeberg</b><br />Brandvorwerkstraße 76, 04275 Leipzig",
                "phone": "0341 14923081",
                "address": "Brandvorwerkstraße 76",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04275",
                "website": "https://bio-am-fockeberg.de",
                "Categories": "Bio"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3591760, 51.3429270]
            },
            "properties": {
                "name": "La Chocolaterie",
                "popupContent": "<b>La Chocolaterie</b><br />Waldstraße 12, 04105 Leipzig",
                "phone": "0341 5611268",
                "address": "Waldstraße 12",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04105",
                "website": "http://la-chocolaterie.de",
                "Categories": "Cafe, chocolaterie"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3359770, 51.3237720]
            },
            "properties": {
                "name": "Grüne Pforte",
                "popupContent": "<b>Grüne Pforte</b><br />Erich-Zeigner-Allee 64, 04229 Leipzig",
                "phone": "",
                "address": "Erich-Zeigner-Allee 64",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "http://www.gruene-pforte.de/",
                "Categories": "Regional, Saisonal"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3334240, 51.3262870]
            },
            "properties": {
                "name": "Leipspeis ",
                "popupContent": "<b>Leipspeis</b><br />Naumburger Str. 10, 04229 Leipzig",
                "phone": "0177 2342348",
                "address": "Naumburger Str. 10",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "http://leipspeis.de/",
                "Categories": "Bio, Regional"
            }
        }
    ]
};

function buildLocationList(data) {
    // Iterate through the list of stores
    for (i = 0; i < data.features.length; i++) {
        var currentFeature = data.features[i];
        // Shorten data.feature.properties to just `prop` so we're not
        // writing this long form over and over again.
        var prop = currentFeature.properties;
        // Select the listing container in the HTML and append a div
        // with the class 'item' for each store
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        listing.id = 'listing-' + i;

        // add info icon 
        var icon = listing.appendChild(document.createElement('i'));
        icon.className = 'fi-info';
        icon.style = 'float:right; font-size:48px; color:#00853e; padding-right: 4px';


        // Create a new link with the class 'title' for each store
        // and fill it with the store address
        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.dataPosition = i;
        link.innerHTML = prop.name;


        // Create a new div with the class 'details' for each store
        // and fill it with the city and phone number
        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop.address;


        /*if (prop.phone) {
            details.innerHTML += ' &middot; ' + prop.phoneFormatted;
        
        }*/

        // Add an event listener for the links in the sidebar listing
        link.addEventListener('click', function (e) {
            // Update the currentFeature to the store associated with the clicked link
            var clickedListing = data.features[this.dataPosition];
            // 1. Fly to the point associated with the clicked link
            flyToStore(clickedListing);
            // 2. Close all other popups and display popup for clicked store
            createPopUp(clickedListing);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });
    }
}

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({
            closeOnClick: false
        })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
            '<h4>' + currentFeature.properties.address + '</h4>')
        .addTo(map);
}

var map = new mapboxgl.Map({
    container: 'map',
    style: 'json/style-cdn.json',
    center: [51.3272, 12.3722],
    zoom: 16,
    attributionControl: true,
    hash: true
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function (e) {
    // Add the data to your map as a layer
    map.addSource('places', {
        type: 'geojson',
        data: stores
    });

    buildLocationList(stores);

});

stores.features.forEach(function (marker) {
    // Create a div element for the marker
    var el = document.createElement('div');
    // Add a class called 'marker' to each div
    el.className = 'marker';
    // By default the image for your custom marker will be anchored
    // by its center. Adjust the position accordingly
    // Create the custom markers, set their position, and add to map
    new mapboxgl.Marker(el, {
            offset: [0, -23]
        })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

    el.addEventListener('click', function (e) {
        var activeItem = document.getElementsByClassName('active');
        // 1. Fly to the point
        flyToStore(marker);
        // 2. Close all other popups and display popup for clicked store
        createPopUp(marker);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        e.stopPropagation();
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        var listing = document.getElementById('listing-' + i);
        console.log(listing);
        listing.classList.add('active');
    });
});

// Add an event listener for when a user clicks on the map
map.on('click', function (e) {
    // Query all the rendered points in the view
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['locations']
    });

    if (features.length) {
        var clickedPoint = features[0];
        // 1. Fly to the point
        flyToStore(clickedPoint);
        // 2. Close all other popups and display popup for clicked store
        createPopUp(clickedPoint);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
        var selectedFeature = clickedPoint.properties.address;

        for (var i = 0; i < stores.features.length; i++) {
            if (stores.features[i].properties.address === selectedFeature) {
                selectedFeatureIndex = i;
            }
        }
        // Select the correct list item using the found index and add the active class
        var listing = document.getElementById('listing-' + selectedFeatureIndex);
        listing.classList.add('active');
    }
});