$(document).ready(function () {

  return require([
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/LayerList',
    'esri/layers/FeatureLayer',
    'esri/Graphic',
    'esri/layers/support/Field',
    'esri/layers/GraphicsLayer',
    'esri/widgets/TimeSlider',
    'esri/layers/support/TimeInfo'
  ], function (
    Map,
    MapView,
    LayerList,
    FeatureLayer,
    Graphic,
    Field,
    GraphicsLayer,
    TimeSlider,
    TimeInfo
  ) {
    var map = new Map({
      basemap: 'gray'
    });

    var view = new MapView({
      container: 'viewDiv',
      map: map,
      zoom: 10, // Sets zoom level based on level of detail (LOD)
      center: [-112, 33]
    });

    const timeSlider = new TimeSlider({
      container: 'timeSlider',
      playRate: 500,
      stops: {
        interval: {
          value: 1,
          unit: 'months'
        }
      }
    });
    view.ui.add(timeSlider, 'manual');

    getDataByCity('phoenix')
      .then(res => {
        let typeSelected = 'Drugs'
        const lyr = createLayer(res)
        $('#changeType').on('change', function () {
          typeSelected = $('#changeType').val()
          lyr.definitionExpression = `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}' AND Type = '${typeSelected}'`
        })
        // debugger
        map.add(lyr);

        // // // wait till the layer view is loaded
        view.whenLayerView(lyr).then(function (lv) {
          layerView = lv;
          const start = new Date(2013, 4, 25);
          timeSlider.fullTimeExtent = {
            start: lyr.timeInfo.fullTimeExtent.start,
            end: new Date()
          };
          const end = new Date(start);
          end.setDate(end.getDate() + 10);
          timeSlider.values = [start, end];
        });

        // watch for time slider timeExtent change
        timeSlider.watch('timeExtent', function () {
          `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}' AND Type = '${typeSelected}'`
          layerView.effect = {
            filter: {
              timeExtent: timeSlider.timeExtent,
              geometry: view.extent
            },
            excludedEffect: 'grayscale(20%) opacity(12%)'
          };
        });
      })
    return view;

  });
});
