
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
                "Categories": "Cafe, patisserie, feinkost",
                "icon.className": "maki maki-3x maki-fw maki-cafe",
                "el.className": 'extra-marker extra-marker-circle-orange-dark'
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
                "Categories": "Cafe, chocolaterie",
                "icon.className": "maki maki-3x maki-fw maki-bakery",
                "el.className": 'extra-marker extra-marker-circle-orange-dark'
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3668595, 51.316116]
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
                "Categories": "Biolebensmittel",
                "icon.className": "maki maki-3x maki-fw maki-grocery",
                "el.className": 'extra-marker extra-marker-circle-green'
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.336423397064, 51.324118132909]
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
                "Categories": "Lebensmittel, Regional, Saisonal",
                "icon.className": "maki maki-3x maki-fw maki-village",
                "el.className": 'extra-marker extra-marker-circle-yellow'
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3334240, 51.3262870]
            },
            "properties": {
                "name": "Leipspeis",
                "popupContent": "<b>Leipspeis</b><br />Naumburger Str. 10, 04229 Leipzig",
                "phone": "0177 2342348",
                "address": "Naumburger Str. 10",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "http://leipspeis.de/",
                "Categories": "Lebensmittel, Bio, Regional",
                "icon.className": "maki maki-3x maki-fw maki-village",
                "el.className": 'extra-marker extra-marker-circle-green'
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.381953, 51.3439768]
            },
            "properties": {
                "name": "Kunst, Handwerk & Plauener Spitze",
                "popupContent": "<b>Kunst, Handwerk & Plauener Spitze</b><br />Willy-Brandt-Platz 7, 04109 Leipzig",
                "phone": "",
                "address": "Willy-Brandt-Platz 7",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04109",
                "website": "",
                "Categories": "Kunsthandwerk, Regional",
                "icon.className": "maki maki-3x maki-fw maki-village",
                "el.className": 'extra-marker extra-marker-circle-yellow'
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.372704819171, 51.32304065]
            },
            "properties": {
                "name": "HIVYOHIVYO",
                "popupContent": "<b>HIVYOHIVYO</b><br />Arndtstraße 32, 04275 Leipzig",
                "phone": "0341 24721480",
                "address": "Arndtstraße 32",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04275",
                "website": "",
                "Categories": "modeatelier, Fashion accessories",
                "icon.className": "maki maki-3x maki-fw maki-clothing-store",
                "el.className": "extra-marker extra-marker-circle-red"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.373881787062, 51.323389281125]
            },
            "properties": {
                "name": "Südhang",
                "popupContent": "<b>Südhang</b><br />Karl-Liebknecht-Straße 79, 04275 Leipzig",
                "phone": "0341 3011940",
                "address": "Karl-Liebknecht-Straße 79",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04275",
                "website": "",
                "Categories": "weinladen, feinkost",
                "icon.className": "maki maki-3x maki-fw maki-alcohol-shop",
                "el.className": "extra-marker extra-marker-circle-yellow"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3282532023983, 51.31739995]
            },
            "properties": {
                "name": "Kräuterladen",
                "popupContent": "<b>Kräuterladen</b><br />Windorfer Straße 44, 04229 Leipzig",
                "phone": "0341 225 29 871",
                "address": "Windorfer Straße 44",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "",
                "Categories": "lokal, Kräuter, Gewürze, Veranstaltungen, Cafe",
                "icon.className": "maki maki-3x maki-fw maki-park2",
                "el.className": "extra-marker extra-marker-circle-green"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [51.3268638, 12.3249271]
            },
            "properties": {
                "name": "Feinbäckerei Renelt",
                "popupContent": "<b>Feinbäckerei Renelt</b><br />Naumburger Straße 55, 04229 Leipzig",
                "phone": "0341 4772900",
                "address": "Naumburger Straße 55",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "",
                "Categories": "lokal, bäckerei, Cafe",
                "icon.className": "maki maki-3x maki-fw maki-bakery",
                "el.className": "extra-marker extra-marker-circle-yellow"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3413334, 51.3219992]
            },
            "properties": {
                "name": "Pro Regional",
                "popupContent": "<b>Feinbäckerei Renelt</b><br />Schnorrstraße 34, 04229 Leipzig",
                "phone": "0341 2602515",
                "address": "Schnorrstraße 34",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "",
                "Categories": "lebensmittel, regional",
                "icon.className": "maki maki-3x maki-fw maki-village",
                "el.className": "extra-marker extra-marker-circle-yellow"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.3410598, 51.3253279]
            },
            "properties": {
                "name": "RöstGut ",
                "popupContent": "<b>RöstGut </b><br />Holbeinstraße 29, 04229 Leipzig",
                "phone": "0341 580 967 58",
                "address": "Holbeinstraße 29",
                "city": "Leipzig",
                "country": "Germany",
                "postalCode": "04229",
                "website": "",
                "Categories": "lebensmittel, regional",
                "icon.className": "maki maki-3x maki-fw maki-cafe",
                "el.className": "extra-marker extra-marker-circle-orange-dark"
            }
        }
    ]
};


// Map 
var map = new mapboxgl.Map({
    container: 'map',
    style: 'json/style-cdn.json',
    center: [12.3722, 51.3272],
    zoom: 11,
    attributionControl: true,
    hash: true
});


// Map event listeners
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function (e) {
    // Add the data to your map as a layer
    map.addSource('places', {
        type: 'geojson',
        data: stores
    });

    buildLocationList(stores);

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


// Functions
function buildLocationList(data) {
    // Iterate through the list of stores
    for (i = 0; i < data.features.length; i++) {
        var currentFeature = data.features[i];
        // Shorten data.feature.properties to just `prop` so we're not writing this long form over and over again.
        var prop = currentFeature.properties;
        // Select the listing container in the HTML and append a div  with the class 'item' for each store
        var listings = document.getElementById('listings');
        var card = listings.appendChild(document.createElement('div'));
        card.className = 'item card';
        card.id = i;

        var card_header = card.appendChild(document.createElement('div'));
        card_header.className = 'card-header';
        card_header.setAttribute('role', 'tab');
        card_header.setAttribute('id',  'heading' + card.id);
        
                // add info icon 
        var icon = card_header.appendChild(document.createElement('i'));
        icon.href = '#';
        icon.className = 'fa fa-info-circle list-icon';
        //icon.style = 'float:right; font-size:41px; color:#00853e; padding-right: 4px margin-top: -40px;';
        
        
        var card_mb0 = card_header.appendChild(document.createElement('h5'));
        card_mb0.className = 'mb-0';
               
        // Create a new link with the class 'title' for each store and fill it with the store address
        var link = card_mb0.appendChild(document.createElement('a'));
        link.href = '#collapse' + card.id;
        link.setAttribute('data-toggle', 'collapse');
        link.className = 'title';        
        link.setAttribute('aria-expanded',  'true');
        link.setAttribute('aria-controls', '#collapse' + card.id);
        link.innerHTML = prop.name;
        link.dataPosition = i;
        
        
        
        var card_collapse = card.appendChild(document.createElement('div'));
        card_collapse.className = 'collapse';
        card_collapse.setAttribute('id',  'collapse' + card.id);
        card_collapse.setAttribute('role', 'tabpanel');
        card_collapse.setAttribute('aria-labelledby', 'heading' + card.id);
        card_collapse.setAttribute('data-parent', '#accordion');

        var card_body = card_collapse.appendChild(document.createElement('div'));
        card_collapse.innerHTML = prop.address;
        
        

        

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
                //activeItem[0].classList.remove('is-active');
            }
            this.parentNode.classList.add('active');
            //this.parentNode.classList.add('is-active');
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

stores.features.forEach(function (marker) {

    let shadow = document.createElement('div');
    shadow.className = 'extra-marker extra-marker-shadow';
    //el.insertBefore(shadow, icon);

    //On crée un element DOM pour le marker
    let el = document.createElement('div');
    el.className = marker.properties["el.className"];
    shadow.appendChild(el);

    let icon = document.createElement('i');
    //icon.className = 'fa fa-circle';
    icon.style.color = 'white';
    icon.className = marker.properties["icon.className"];
    el.appendChild(icon);



    // Create a div element for the marker
    //var el = document.createElement('div');
    // Add a class called 'marker' to each div
    // el.className = 'marker';
    // By default the image for your custom marker will be anchored
    // by its center. Adjust the position accordingly
    // Create the custom markers, set their position, and add to map
    new mapboxgl.Marker(shadow, {
            offset: [10, 0]
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