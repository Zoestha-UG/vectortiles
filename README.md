# vectortiles
Store locator using Mapbox GL and tileserver-php from klokantech
It can be hosted on a standard Apache+PHP web hosting

# Tiles
The original maptiles of Leipzig-Germany has been downloaded from https://openmaptiles.org/

# Vectortiles in xyz format
For better performance, the .mbtiles must be first extracted in *.pbf files. This can be done using the python utility mb-util from mapbox, then the files must be gzip decompressed.
./mb-util --image_format=pbf countries.mbtiles countries
gzip -d -r -S .pbf *
find . -type f -exec mv '{}' '{}'.pbf \;
