const api_url =  'https://api.wheretheiss.at/v1/satellites/25544';
const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

//centering ISS button


//making map and tiles
const map = L.map('mapid').setView([0,0], 2);

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution});    

tiles.addTo(map);
//changing the icon
var myIcon = L.icon({
    iconUrl: 'pngwing.com.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    
});

//adding icon to map with default coordinates
const marker = L.marker([0,0],{ icon:myIcon }).addTo(map);



const lat = document.getElementById('lat');
const lon = document.getElementById('lon');

let firstTime = true;

async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude } = data;
    lat.innerHTML = latitude.toFixed(3);
    lon.innerHTML = longitude.toFixed(3);

   marker.setLatLng([latitude,longitude]);

   if(firstTime){
   map.setView([latitude,longitude],2);
   firstTime = false;
   }

   //keep icon centered
   map.setView([latitude,longitude]);
    
   const button = document.getElementById("center-btn");
   button.addEventListener('click',function(){
        map.setView([latitude,longitude],2);
   })
    
}


getISS();

setInterval(getISS,5000);
