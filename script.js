
const map = L.map ("singaporeMap");
map.setView ([1.3521,103.8198], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
// let court1 = L.marker ([1.3493592234373146, 103.85135136162316]);
// court1.addTo(map);

// const markerClusterLayer = L.markerClusterGroup();
// markerClusterLayer.addTo(map);
// for (let i = 0; i <1000; i++) {
//     const randomPosition = getRandomLatLng(map);
//     L.marker(randomPosition).addTo(markerClusterLayer);
// }

 
async function LoadProducts(map)
{
    const response = await axios.get("basketballcourt.json");
    return response.data;
    // const markerClusterLayer = L.markerClusterGroup();
    // markerClusterLayer.addTo(map);
    // for (let i = 0; i <1000; i++) {
    //     const randomPosition = getRandomLatLng(map);
    //     L.marker(randomPosition).addTo(markerClusterLayer);
    // }
}


document.addEventListener("DOMContentLoaded", async function(){
    const weather = await getWeather();
    let data = await LoadProducts();
    // console.log(data);
    const markerClusterLayer = L.markerClusterGroup();
    const indoorClusterLayer = L.markerClusterGroup();
    const outdoorClusterLayer = L.markerClusterGroup();
    const weatherCluster  = L.markerClusterGroup();
    let basketballCourtIcon = L.icon ({
        iconUrl: 'basketball.png',
        iconSize : [25, 25],
        iconAnchor : [12.5, 12.5],
        popupAnchor : [0 , 0]
    })
    const stationsarray = weather.metadata.stations;
    const weatherarray = weather.items[0].readings;
    for (let index = 0; index < stationsarray.length; index++) {
      // stationsarray[index].location.latitude
      let raining = "Not Raining";
      if(!weatherarray[index].value == 0)
        raining = "Raining"
      let marker = L.marker ([stationsarray[index].location.latitude, stationsarray[index].location.longitude]);
      let popup = `<h3>${stationsarray[index].name} - ${stationsarray[index].device_id}</h3>
      <h5>${raining} - ${weatherarray[index].value}mm</h5>`
      marker.bindPopup (popup);
      marker.addTo(weatherCluster);
    }

    markerClusterLayer.addTo(map);
    for (let d of data) {
        let marker = L.marker([d.lat,d.lng], {icon: basketballCourtIcon} ); 
        let popup=`<h3>${d.Name}</h3>
        <img src = "${d.image}" class="basketballimg">`;
        marker.bindPopup (popup);
        marker.addTo(markerClusterLayer);
        console.log(d.Indoor);
        if(d.Indoor == "Yes")
        {
            marker.addTo(indoorClusterLayer);
        }
        else if (d.Indoor == "No")
        {
            marker.addTo(outdoorClusterLayer);
        }
        // L.marker(randomPosition).addTo(markerClusterLayer);
        
    }
   const baseLayers = {
    'All Basketball Courts' : markerClusterLayer,
    'Indoor' : indoorClusterLayer,
    'Outdoor' : outdoorClusterLayer,
   }
   const overlayLayers = {
    'Weather' : weatherCluster
   }
   L.control.layers(baseLayers,overlayLayers).addTo(map)
   
   const searchLayer = L.layerGroup();
   searchLayer.addTo(map);
   document.getElementById('searchButton').addEventListener('click', function() {
    searchLayer.clearLayers()
    var searchTerm = prompt('Enter search term:');
    if (searchTerm) {
      // Perform search functionality
      // Example: Loop through cluster layer markers and filter based on search term
      for (let d of data) 
      {
        // Example: Check if marker title contains the search temr
        let comname = d.Name.toLowerCase().trim().split(" ").join("");

        
        if (comname.includes(searchTerm.toLowerCase().trim().split(" ").join(""))) {
          // Show marker
          let searchMarker = L.marker ([
            d.lat,
            d.lng
          ]
          )
          searchMarker.addTo(searchLayer);
          let popup=`<h3>${d.Name}</h3>
            <img src = "${d.image}" class="basketballimg">`;
            searchMarker.bindPopup (popup);
        } 
      }
    }
  });
})

function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// document.getElementById('searchButton').addEventListener('click', function() {
//     var searchTerm = prompt('Enter search term:');
//     if (searchTerm) {
//       // Perform search functionality
//       // Example: Loop through cluster layer markers and filter based on search term
//       markers.eachLayer(function(marker) {
//         // Example: Check if marker title contains the search term
//         if (marker.options.title.includes(searchTerm)) {
//           // Show marker
//           marker.addTo(map);
//         } else {
//           // Hide marker
//           map.removeLayer(marker);
//         }
//       });
//     }
//   });
// const emptyLayer = L.layerGroup ();
// const indoorLayer = L.markerClusterGroup ();
// const outdoorLayer = L.markerClusterGroup ();

// const baseLayers = {
//     'None' : emptyLayer,
//     'Indoor' : indoorLayer,
//     'Outdoor' : outdoorLayer,
// }
// let group= L.layerGroup(); // 1. create the layer group
// L.marker(getRandomLatLng(map)).addTo(group);  // 2. add markers to the group
// L.marker(getRandomLatLng(map)).addTo(group);
// L.marker(getRandomLatLng(map)).addTo(group);

// add the group layer to the map
// group.addTo(map);

// let group2 = L.layerGroup();
// for (let i = 0; i < 5; i++) {
//     L.circle(getRandomLatLng(map), {
//     color: 'red',
//     fillColor:"orange",
//     fillOpacity:0.5,
//     radius: 500
// }).addTo(group2);
// }

// let group3 = L.layerGroup();
// for (let i = 0; i < 5; i++) {
//     L.circle(getRandomLatLng(map), {
//     color: 'red',
//     fillColor:"green",
//     fillOpacity:0.5,
//     radius: 250
// }).addTo(group3);
// // group3.addTo(map)
// }
// group3.addTo(map)



