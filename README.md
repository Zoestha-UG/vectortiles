# Vectortiles ![Marker mit Schatten](https://github.com/sheub/vectortiles/blob/master/media/Marker_with_Shadow.png)

Store locator using Mapbox-GL and tileserver-php from klokantech.
It can be hosted on a standard Apache+PHP web hosting.

### Installing

Web Project written in php Javascript css html. Simply clone or download and extract the repository to your host server.

### Map rendering and listing

![Leipzig_Einkaufen_Map_List](https://github.com/sheub/vectortiles/blob/master/media/Leipzig_Einkaufen_Map_List.png)The map rendering is done using mapboxgl.js library. The filtering functionalities have been implemented using the following examples from mapbox:



Filter the store locations *with dropdown box*: 

https://www.mapbox.com/mapbox-gl-js/example/filter-markers/

Filter the store list *within the map view*:

 https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/

Add *Custom Marker*: 

https://www.mapbox.com/mapbox-gl-js/example/add-image/

Add *Fullscreen button*:

https://www.mapbox.com/mapbox-gl-js/example/fullscreen/



### Vectortiles in xyz format

For higher performance the .mbtile file has been extracted to .pbf files format. This can be done using the python utility mb-util from mapbox, then the files must be gzip decompressed. The following commands lines will do the tricks.

```
./mb-util --image_format=pbf countries.mbtiles countries
gzip -d -r -S .pbf *
find . -type f -exec mv '{}' '{}'.pbf \;
```

### Tiles

The original maptiles of Leipzig-Germany has been purchased at https://openmaptiles.org/ . They are subject to license restriction (see [license](https://github.com/sheub/vectortiles/blob/master/LICENSE)).
