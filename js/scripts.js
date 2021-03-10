
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ubWFyaWVqZW5ueSIsImEiOiJja2w4NGUycWMydHVnMnBwbGtwYTd2bDdsIn0.nw5eYr-3jZj6cS7lDUIFMg';

var map = new mapboxgl.Map ({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-73.971425,40.758713],
    zoom: 10.5
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.on('style.load', function(){
  // add a geojson source
    map.addSource('nyc_vacant_lots_pluto', {
      type: 'geojson',
      data: '/data/pluto-map.geojson'
  });

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

  map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);
})

var VacantID = null;

map.on('mousemove', 'pluto-vacant-fill', (e) => {
  map.getCanvas().style.cursor = 'pointer';

map.on('mouseleave', 'pluto-vacant-fill', (e) => {
  map.getCanvas().style.cursor = '';
})


    new mapboxgl.Popup()
        .setLngLat(coordinates)
    });

  // add a layer to style and display the addSource

  /*map.on('mousemove', function(e)) {
    //query for the features under the mouse, but only for vacant lots layer
    var features = map.queryRenderedFeatures(e.point,){
      layers:['nyc_vacant_lots_pluto'],
    }
  });
    console.log(features)
  })

  // Create a popup, but don't add it to the map yet
  //source: mapbox.com/mapbox-gl-js/example/popup-on-hover/
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });*/



/*map.on('style.load', function(){
  // add a geojson source
    map.addSource('nyc_vacant_lots_join', {
      type: 'geojson',
      data: '/data/vacant_pluto_opendata.geojson'
  });

  // add a layer to style and display the addSource
  map.addLayer({
    'id': 'join-vacant-fill',
    'type': 'fill',
    'source': 'nyc_vacant_lots_join',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
})*/

/*map.on('style.load', function(){
  // add a geojson source
    map.addSource('nyc_vacant_lots_points', {
      type: 'geojson',
      data: '/data/vacant_join_point.geojson'
  });

  // add a layer to style and display the addSource
  map.addLayer({
    'id': 'points-vacant-fill',
    'type': 'fill',
    'source': 'nyc_vacant_lots_points',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
})*/
