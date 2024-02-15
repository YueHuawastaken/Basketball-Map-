const map = L.map ("singaporeMap");
map.setView ([1.3521,103.8198], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
// let court1 = L.marker ([1.3493592234373146, 103.85135136162316]);
// court1.addTo(map);
 
async function LoadProducts()
{
    const response = await axios.get("basketballcourt.json");
    return response.data;
}


document.addEventListener("DOMContentLoaded", async function(){

    let data = await LoadProducts();
    console.log(data);
    for (let d of data) {
        let marker = L.marker([d.lat,d.lng]);
        let popup=`<h3>${d.Name}</h3>
        <img src = "${d.image}">`;
        marker.bindPopup (popup);
        marker.addTo(map);
       
        
    }
})