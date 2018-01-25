
# Vectortiles
Store locator using Mapbox GL and tileserver-php from klokantech.
It can be hosted on a standard Apache+PHP web hosting.

# Tiles
The original maptiles of Leipzig-Germany has been taken from https://openmaptiles.org/

# Vectortiles in xyz format
For better performance, the .mbtiles must be extracted to .pbf files format. This can be done using the python utility mb-util from mapbox, then the files must be gzip decompressed. The following commands lines will do the tricks.

```
./mb-util --image_format=pbf countries.mbtiles countries
gzip -d -r -S .pbf *
find . -type f -exec mv '{}' '{}'.pbf \;
```
# Map rendering and listing
The map rendering is entirely done using mapboxgl.js library. All the listing and filtering fonctionalities have been implemented using the examples given by mapbox.
