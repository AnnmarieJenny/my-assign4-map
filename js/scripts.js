
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

map.on('load', function(){
    // add data for layer
    // add a geojson source
    map.addSource('nyc-vacant-lots', {
        type: 'geojson',
        data: 'data/vacant-lots-joined.geojson'
    });
    //specify info for layer to be projected from data
    map.addLayer({
        'id': 'nyc-vacant-fill',
        'type': 'fill',
        'source': 'nyc-vacant-lots',
        'layout': {
          // make layer visible by default
          'visibility': 'visible'
        },
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        },
        'source-layer':'joined-data-vacant'
    });

    // add souce and layer for nyc open data-pluto data join
    // shows vacant lots likely more ready for immediate development
    map.addSource('pluto-vacant-lots', {
        type: 'geojson',
        data: 'data/pluto-map-qgisedited.geojson'
    });
    //specify info for layer to be projected from data
    map.addLayer({
        'id': 'pluto-vacant-fill',
        'type': 'fill',
        'source': 'pluto-vacant-lots',
        'layout': {
          // make layer visible by default
          'visibility': 'visible'
        },
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        },
        'source-layer':'pluto-vacant'
    });
});

//enumerate ids of the layers
var toggleableLayersIds = ['pluto-vacant-fill', 'nyc-vacant-fill'];

// set up the corresponding toggle button for each layer
for (var i = 0; i < toggleableLayerIds.length; i++) {
var id = toggleableLayerIds[i];

var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = id;

link.onclick = function (e) {
var clickedLayer = this.textContent;
e.preventDefault();
e.stopPropagation();

var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

// toggle layer visibility by changing the layout object's visibility property
if (visibility === 'visible') {
map.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
}
};

var layers = document.getElementById('menu');
layers.appendChild(link);
}

// create pop up with multiple properties listed below
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['nyc-vacant-fill']
  });
  // use function (VacantLots) from above to create a var that pulls from that data
  var myHTML = `
      <div><b>Address: </b>${features[0].properties.Address}</div>
      <div><b>Owner Name: </b>${features[0].properties.OwnerName}</div>
      <div><b>BBL: </b>${features[0].properties.bbl}</div>
      `
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(myHTML)
    .addTo(map);
  });

// turn pointer on when it hovers over geos/vacant lots
map.on('mouseenter', 'nyc-vacant-fill', (e) => {
  map.getCanvas().style.cursor = 'pointer';
    })
// turn pointer off when it hovers away from geos/vacant lots
map.on('mouseleave', 'nyc-vacant-fill', (e) => {
  map.getCanvas().style.cursor = '';
})

                             
