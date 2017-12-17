var map = new mapboxgl.Map({
  container: 'map',
  style: 'json/style-cdn.json',
  center: [12.3722, 51.3272],
  zoom: 11,
  attributionControl: true,
  hash: true
});


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
  closeButton: false
});

var filterEl = document.getElementById('feature-filter');
var listings = document.getElementById('listings');
var mapMarkers = [];
/*Load stores2*/
stores2 = (function() {
  var stores2 = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "https://zoestha.de/vectortiles/location.json",
    'dataType': "json",
    'success': function(data) {
      stores2 = data;
    }
  });
  return stores2;
})();

// Map event listeners
//map.addControl(new mapboxgl.NavigationControl());

map.on('load', function(e) {

  // Add the data to your map as a layer
  map.addSource('locations_source', {
    "type": 'geojson',
    "data": stores2 //"http://localhost/vectortiles/location.geojson"
  });

  // Add the data to your map as a layer
  map.addLayer({
    "id": 'locations',
    "type": 'symbol',
    // Add a GeoJSON source containing place coordinates and information.
    "source": 'locations_source',
    "layout": {
      "icon-image": "{icon.className}-15",
      "text-field": ".",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, -2.0],
      "text-anchor": "top",
      "text-padding": 0,
      "text-allow-overlap": true
    }
  });

  // Add an event listener for when a user clicks on the map
  map.on('click', function(e) {
    // Query all the rendered points in the view
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['locations']
    });

    if (features.length) {
      var clickedPoint = features[0];
      // 1. Fly to the point
      //flyToStore(clickedPoint);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedPoint);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('is-active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('is-active');
      }
      // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
      var selectedFeature = clickedPoint.properties.address;

      for (var i = 0; i < stores2.features.length; i++) {
        if (stores2.features[i].properties.address === selectedFeature) {
          selectedFeatureIndex = stores2.features[i].properties.id;
        }
      }
      // Select the correct list item using the found index and add the active class
      var listing = document.getElementById('heading' + selectedFeatureIndex);
      listing.classList.add('is-active');
      /*var listingid = listing.id;
      $('#' + listing.id).collapse('toggle');*/
      $('heading' + selectedFeatureIndex).collapse('toggle');

    }
  });

  map.on('moveend', function() {
    // Query all the rendered points in the view
    var features = map.queryRenderedFeatures({layers: ['locations']});

    if (features) {

      //if (features) {
      var uniqueFeatures = getUniqueFeatures(features, "Categories");
      // Populate features for the listing overlay.
      buildLocationList(uniqueFeatures);

      // Clear the input container
      filterEl.value = '';

      // Store the current features in sn `locations_on_map` variable to
      // later use for filtering on `keyup`.
      locations = uniqueFeatures;
    }
  });

  map.on('mousemove', 'locations', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // // Populate the popup and set its coordinates based on the feature.
    // var feature = e.features[0];
    // popup.setLngLat(feature.geometry.coordinates)
    //   .setText(feature.properties.name + ' (' + feature.properties.abbrev + ')')
    //   .addTo(map);
  });

  map.on('mouseleave', 'locations', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  filterEl.addEventListener('keyup', function(e) {

    var value = normalize(e.target.value);

    // Filter visible features that don't match the input value.
    var filtered = locations.filter(function(feature) {
      var name = normalize(feature.properties.name);
      var Categories = normalize(feature.properties.Categories);
      return name.indexOf(value) > -1 || Categories.indexOf(value) > -1;
    });

    // Populate the sidebar with filtered results
    buildLocationList(filtered);

    // Set the filter to populate features into the layer.
    map.setFilter('locations', ['in', 'name'].concat(filtered.map(function(feature) {
      return feature.properties.name;
    })));


    mapMarkers.forEach(function(marker) {
    marker.remove();
});
      
    // call createMarker forEach filetered
    filtered.forEach(createMarker);
    
  });

  // Call this function on initialization
  // passing an empty array to render an empty state
  buildLocationList([]);
});

function normalize(string) {
    return string.trim().toLowerCase();
}

function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {};
  // Because features come from tiled vector data, feature geometries may be split
  // or duplicated across tile boundaries and, as a result, features may appear
  // multiple times in query results.
  var uniqueFeatures = array.filter(function(el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false;
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true;
    }
  });

  return uniqueFeatures;
}

function buildLocationList(data) {
  // Iterate through the list of stores
  listings.innerHTML = '';
  if (data.length) {
    data.forEach(function(feature) {
      // Shorten data.feature.properties to just `prop` so we're not writing this long form over and over again.
      var prop = feature.properties;
      // Select the listing container in the HTML and append a div  with the class 'item' for each store

      var card = listings.appendChild(document.createElement('div'));
      card.className = 'item card';
      card.id = prop.id;

      var card_header = card.appendChild(document.createElement('div'));
      card_header.className = 'card-header';
      card_header.setAttribute('role', 'tab');
      card_header.setAttribute('id', 'heading' + card.id);
      card_header.id = 'heading' + card.id;

      // add info icon
      var icon = card_header.appendChild(document.createElement('i'));
      icon.href = '#';
      icon.className = 'fa fa-info-circle list-icon';

      var card_mb0 = card_header.appendChild(document.createElement('h5'));
      card_mb0.className = 'mb-0';

      // Create a new link with the class 'title' for each store and fill it with the store address
      var link = card_mb0.appendChild(document.createElement('a'));
      link.setAttribute('data-toggle', 'collapse');
      link.href = '#collapse' + card.id;
      link.setAttribute('aria-expanded', 'false');
      link.setAttribute('aria-controls', 'collapse' + card.id);
      link.className = 'title';
      link.innerHTML = prop.name;
      link.dataPosition = card.id;

      var card_collapse = card.appendChild(document.createElement('div'));
      card_collapse.className = 'collapse';
      card_collapse.setAttribute('id', 'collapse' + card.id);
      card_collapse.setAttribute('role', 'tabpanel');
      card_collapse.setAttribute('aria-labelledby', 'heading' + card.id);
      card_collapse.setAttribute('data-parent', '#listings');

      var card_body = card_collapse.appendChild(document.createElement('div'));
      card_body.className = 'card-body';
      card_body.innerHTML = prop.address;

      // Add an event listener for the links in the sidebar listing
      link.addEventListener('click', function(e) {
        // Update the currentFeature to the store associated with the clicked link
        var clickedListing = stores2.features[this.dataPosition];
        // 1. Fly to the point associated with the clicked link
        //flyToStore(clickedListing);
        // 2. Close all other popups and display popup for clicked store
        createPopUp(clickedListing);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('is-active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('is-active');
          //activeItem[0].classList.remove('is-active');
        }
        this.classList.add('is-active');
        //this.parentNode.classList.add('is-active');
      });

    })
    // Show the filter input
        filterEl.parentNode.style.display = 'block';
  } else {
    var empty = document.createElement('p');
    empty.textContent = 'Ziehen Sie die Karte, um die Ergebnisse zu füllen';
    listings.appendChild(empty);

    // Hide the filter input
    filterEl.parentNode.style.display = 'none';

    // remove features filter
    map.setFilter('locations', ['has', 'Categories']);
  }
}

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 14
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

function createMarker(currentFeature) {
  let shadow = document.createElement('div');
  shadow.className = 'extra-marker extra-marker-shadow';

  // create a HTML element for each feature
  let el = document.createElement('div');
  el.className = currentFeature.properties["el.className"];
  shadow.appendChild(el);

  let icon = document.createElement('i');
  icon.style.color = 'white';
  icon.className = currentFeature.properties["icon.className"];
  el.appendChild(icon);



  // Create a div element for the marker
  //var el = document.createElement('div');
  // Add a class called 'marker' to each div
  // el.className = 'marker';
  // By default the image for your custom marker will be anchored
  // by its center. Adjust the position accordingly
  // Create the custom markers, set their position, and add to map
    
  mapMarkers[currentFeature.properties.id] = new mapboxgl.Marker(shadow, {
      offset: [10, 0]
    })
    .setLngLat(currentFeature.geometry.coordinates)
    .addTo(map);

  el.style.cursor = 'pointer';

  el.addEventListener('click', function(e) {
    var activeItem = document.getElementsByClassName('is-active');

    // 2. Close all other popups and display popup for clicked store
    createPopUp(currentFeature);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove('is-active');
    }
    var listing = document.getElementById('heading' + currentFeature.properties.id);
    listing.classList.add('is-active');
    $('collapse' + currentFeature.properties.id).collapse('toggle');
  });
}

stores2.features.forEach(createMarker);
