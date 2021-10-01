// store geoJSON
const link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// perform a GET request to the query URL
d3.json(link).then((data) => {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data.features);
});

function createMap(earthquakes) {
    // assign the different mapbox styles
    const satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.satellite',
        accessToken: API_KEY
    });

    const grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.light',
        accessToken: API_KEY
    });

    const outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.outdoors',
        accessToken: API_KEY
    });

    const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.darkmap',
        accessToken: API_KEY
});
//Create basemap
    const baseMap = {
        'Satellite': satellite,
        'Grayscale': grayscale,
        'Outdoors': outdoors,
        'Dark': darkmap
    };
//Create tectonic plate layer
    let faults = new L.layerGroup();

    faultsURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
    
    d3.json(faultsURL).then(function(response) {
      function faultStyle(feature) {
        return {
          weight: 2,
          color: "orange"
        };
      }
    
      L.geoJSON(response, {
        style: faultStyle
      }).addTo(faults);
      faults.addTo(myMap)
    });
//Create overlays
    const overlayMap = {
        "Earthquakes": earthquakes,
        "Tectonic Plates": faults
    };
//Create default map
    const myMap = L.map('map', {
        center: [40.7, -94.5],
        zoom: 3,
        layers: [outdoors, earthquakes, faults]
    });

    L.control.layers(baseMap, overlayMap, {
        collapsed: false
    }).addTo(myMap);

    // function to assign colors for legend
    function getColor(d) {
      return d > 90 ? '#f06b6b' :
          d > 70 ? '#f0936b' :
          d > 50 ? '#f3ba4e' :
          d > 30 ? '#f3db4c' :
          d > 10 ? '#e1f34c' :
                  '#b7f34d';
  }
   //Create legend 
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {
        const div = L.DomUtil.create('div', 'info legend'),
              depth = [-10, 10, 30, 50, 70, 90],
              labels = [];


        for (let i = 0; i < depth.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(depth[i] +1) + ';width:10px;height:10px;"></i>' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);

}
//Create function for hover information
function createFeatures(eqdata) {
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h4>Place: ' + feature.properties.place + '</h4><h4>Date: ' + new Date(feature.properties.time) + '</h4><h4>Magnitude: ' + feature.properties.mag + '</h4><h4>Depth: ' + feature.geometry.coordinates[2] + '</h4><h4>USGS Event Page: <a href=' + feature.properties.url + " target='_blank'>Click here</a></h4>", {maxWidth: 400})
    }
//Create markers with magnitude for size and depth for color
    const layerToMap = L.geoJSON(eqdata, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {
            let radius = feature.properties.mag * 4.0;

            if (feature.geometry.coordinates[2] >= 90) {
                fillcolor = '#f06b6b';
            }
            else if (feature.geometry.coordinates[2] >= 70) {
                fillcolor = '#f0936b';
            }
            else if (feature.geometry.coordinates[2] >= 50) {
                fillcolor = '#f3ba4e';
            }
            else if (feature.geometry.coordinates[2] >= 30) {
                fillcolor = '#f3db4c';
            }
            else if (feature.geometry.coordinates[2] >= 10) {
                fillcolor = '#e1f34c';
            }
            else  fillcolor = '#b7f34d';

            return L.circleMarker(latlng, {
                radius: radius,
                color: 'black',
                fillColor: fillcolor,
                fillOpacity: 1,
                weight: 1
            });
        }
    });

    createMap(layerToMap);
}
  