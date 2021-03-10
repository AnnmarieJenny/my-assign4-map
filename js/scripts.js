
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ubWFyaWVqZW5ueSIsImEiOiJja2w4NGUycWMydHVnMnBwbGtwYTd2bDdsIn0.nw5eYr-3jZj6cS7lDUIFMg';

var map = new mapboxgl.Map ({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-73.971425,40.758713],
    zoom: 10.5
});

map.on('style.load', function(){
  // add a geojson source
    map.addSource('nyc_vacant_lots_pluto', {
      type: 'geojson',
      data: '/data/pluto-map-ready-slim2.geojson'
  });

  // add a layer to style and display the addSource
  map.addLayer({
    'id': 'pluto-vacant-fill',
    'type': 'fill',
    'source': 'nyc_vacant_lots_pluto',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
})
