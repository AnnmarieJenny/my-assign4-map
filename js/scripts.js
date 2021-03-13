
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ubWFyaWVqZW5ueSIsImEiOiJja2w4NGUycWMydHVnMnBwbGtwYTd2bDdsIn0.nw5eYr-3jZj6cS7lDUIFMg';
var map = new mapboxgl.Map ({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-73.971425,40.758713],
    zoom: 10.5
});

// add in address search bar
map.addControl(
new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

//add in map zoom in and zoom out feature
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// add data for layer
// add funciton (VacantLots) to connect data to properties below
map.on('load', function(VacantLots){ // was 'style.load' before
  // add a geojson source
map.addSource('nyc_vacant_lots_pluto', {
      type: 'geojson',
      data: 'data/pluto-map-qgisedited.geojson'
  });

//specify info for layer to be projected from data
map.addLayer({
  'id': 'pluto-vacant-fill', // for future reference
  'type': 'fill',
  'source': 'nyc_vacant_lots_pluto',//same as above
  'layout': {},
  'paint': {
    'fill-color': '#088',
    'fill-outline-color': '#96dfe3',
    'fill-opacity': 0.8
    }
  });

// use function (VacantLots) from above to create a var that pulls from that data
var myHTML = `
    <div><b>Address:</b>${VacantLots.Address}</div>
    <div><b>Owner Name:</b>${VacantLots.OwnerName}</div>
    <div><b>Assessment Value of Land:</b>${VacantLots.AssessLand}</div>
    <div><b>BBL:</b>${VacantLots.bbl}</div>`

// create pop up with multiple properties listed above
map.on('click', 'pluto-vacant-fill', function (e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.myHTML)
    .addTo(map);
  });

// turn mouse into pointer when it hovers over vacant lot geos
map.on('mousemove', 'pluto-vacant-fill', (e) => {
  map.getCanvas().style.cursor = 'pointer';

// turn pointer off when it hovers away from vacant lot geos 
map.on('mouseleave', 'pluto-vacant-fill', (e) => {
  map.getCanvas().style.cursor = '';
})

});

})
