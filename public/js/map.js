mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: Usercoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});


// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red'})
  .setLngLat(Usercoordinates)    //Listing.goemtery.coordinates 
  .setPopup(new mapboxgl.Popup({offset: 25})
  .setHTML("<h1>Hello World!</h1>"))
  .addTo(map);
