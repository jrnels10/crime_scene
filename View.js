async function createView() {
    let mapView;
    try {
        return require([
            'esri/Map',
            'esri/views/MapView'
        ], function (
            Map,
            MapView
        ) {
            var map = new Map({
                basemap: 'satellite'
            });

            var view = new MapView({
                container: 'viewDiv',
                map: map,
                zoom: 10, // Sets zoom level based on level of detail (LOD)
                center: [-112, 33]
            });
            return view;
        });
    } catch (error) {
        return console.log(error)
    }
}