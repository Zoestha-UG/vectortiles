# Vectortiles ![Marker mit Schatten](https://github.com/sheub/vectortiles/blob/master/media/Marker_with_Shadow.png)

Example of store locator using Mapbox-GL and tileserver-php from klokantech.
It can be hosted on a standard Apache+PHP web hosting.

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://leipzig-einkaufen.de)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sheub/vectortiles/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sheub/vectortiles/?branch=master)

### Features

- [x] Filter listing within the map view
- [x] Filter listing along calculated route
- [x] Self-hosted map tiles
- [x] Filter locations categories with dropdown box
- [x] Interactive location listing
- [x] Custom Markers
- [x] Route calculation with *MapboxDirections*


### Map rendering and listing

![Leipzig_Einkaufen_Map_List](https://github.com/sheub/vectortiles/blob/master/media/Leipzig_Einkaufen_Map_List.png)The rendering is done using mapboxgl.js library. 
The pluggin *MapboxDirections* is used for the navigation. The filtering allong the Route is done with Turf.js:

```javascript
  // buffer the route with an area of radius 'radius'
  var bufferedLinestring = turf.buffer(mapDirectionsSource._data.features[2].geometry, radius, {
    units: unit
  });

  // update bufferedTraceSource
  map.getSource('bufferedTraceSource').setData(bufferedLinestring);

  // Get locations rendered on the map
  var features = map.queryRenderedFeatures({
    layers: ["locations"]
  });

  // use featureCollection to convert features (array of features) into a collection of 
  // features (Object type FeatureCollection);
  var collection = turf.featureCollection(features);

  // Filter the points to the area around the direction
  ptsWithin = turf.pointsWithinPolygon(collection, bufferedLinestring);
  ```
  
The category and within-map-view filters for the listing have been implemented using the excellent examples from mapbox:



Filter the store locations *with dropdown box*: 

https://www.mapbox.com/mapbox-gl-js/example/filter-markers/

Filter the store list *within the map view*:

 https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/
 
 The custom marker have been added using the Add *Custom Marker* example.

https://www.mapbox.com/mapbox-gl-js/example/add-image/


### Vectortiles in zxy format

For higher performance the .mbtile file has been extracted to .pbf files format. This can be done using the python utility mb-util from mapbox, then the files must be gzip decompressed. The following commands lines will do the tricks.

```
./mb-util --image_format=pbf countries.mbtiles countries
mbutil.mbtiles_to_disk('countries.mbtiles', 'countries', image_format='pbf')
gzip -d -r -S .pbf *
find . -type f -exec mv '{}' '{}'.pbf \;
```

### Acknowledgement

This project has been created to ease the localisation of local retail stores in the city of Leipzig-Germany.
Please feel free to send us your comments or any suggestions you may have to improve it functionality.

### License

The original tiles of Leipzig-Germany have been purchased at https://openmaptiles.org/ . They are subject to license restriction (see [license](https://github.com/sheub/vectortiles/blob/master/LICENSE)).


Copyright (c) 2018-2020 Zoestha-UG, Licensed under BSD 3-Clause License.
