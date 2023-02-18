import './App.scss';

const App = () => {
	return (
		<div className="App">
			<button>IS IT LIVE</button>

			<script>{
			function initMap(): void {
				const map = new window.google.maps.Map(
					document.getElementById("map") as HTMLElement,
					{
					zoom: 18.2,
					center: { lat: 39.741237, lng: -104.980548 },
					mapTypeId: "terrain",
					}
				);

				// Define the LatLng coordinates for the polygon's path.
				const triangleCoords = [
					{ lat: 39.741443, lng: -104.981059 },
					{ lat: 39.741085, lng: -104.98105 },
					{ lat: 39.741099, lng: -104.980527 },
					{ lat: 39.741414, lng: -104.980535 },
				];

				const triangle2Coords = [
					{ lat: 39.741216, lng: -104.980473 },
					{ lat: 39.740822, lng: -104.980458 },
					{ lat: 39.74082, lng: -104.979962 },
					{ lat: 39.7412, lng: -104.979955 },
				];

				const triangle3Coords = [
					{ lat: 39.741608, lng: -104.979869 },
					{ lat: 39.741608, lng: -104.979381 },
					{ lat: 39.741299, lng: -104.979381 },
					{ lat: 39.741299, lng: -104.979869 },
				];

				// Construct the polygon.
				const bermudaTriangle = new window.google.maps.Polygon({
					paths: triangleCoords,
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
				});

				const triangle2 = new window.google.maps.Polygon({
					paths: triangle2Coords,
					strokeColor: "#598be2",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#598be2",
					fillOpacity: 0.35,
				});

				const triangle3 = new window.google.maps.Polygon({
					paths: triangle3Coords,
					strokeColor: "#598be2",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#598be2",
					fillOpacity: 0.35,
				});

				bermudaTriangle.setMap(map);
				triangle2.setMap(map);
				triangle3.setMap(map);
				}

				// declare global {
				// interface Window {
				// 	initMap: () => void;
				// }
				// }
				// window.initMap = initMap;
				// export {};
		}</script>
		</div>
	);
};

export default App;
