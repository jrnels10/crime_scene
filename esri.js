$(document).ready(function () {

  return require([
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/TimeSlider',
    'esri/layers/support/TimeInfo',
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery"
  ], function (
    Map,
    MapView,
    TimeSlider,
    Expand,
    BasemapGallery
  ) {
    var map = new Map({
      basemap: 'gray'
    });

    var view = new MapView({
      container: 'viewDiv',
      map: map,
      zoom: 10, // Sets zoom level based on level of detail (LOD)
      center: [-112, 33.35]
    });
    var basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div")
    });

    var bgExpand = new Expand({
      view: view,
      content: basemapGallery
    });

    $('#city-selected li').on('click', function () {
      typeSelected = $(this).text()
      $("#city-text").html(typeSelected);
      // layer.definitionExpression = `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}' AND Type = '${typeSelected}'`
    })
    $('#year-selected li').on('click', function () {
      typeSelected = $(this).text()
      $("#year-text").html(typeSelected);
      // layer.definitionExpression = `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}' AND Type = '${typeSelected}'`
    })
    $('#type-selected li').on('click', function () {
      typeSelected = $(this).text()
      $("#type-text").html(typeSelected);
      // layer.definitionExpression = `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}' AND Type = '${typeSelected}'`
    })


    const timeSlider = new TimeSlider({
      container: 'timeSlider',
      playRate: 100,
      stops: {
        interval: {
          value: 1,
          unit: 'days'
        }
      }
    });

    // view.ui.add(bgExpand, 'top-right');
    view.ui.add(timeSlider, 'manual');
    $(".fa-search").on('click', () => {
      let cityText = $("#city-text").text();
      let yearText = $("#year-text").text();
      let typeText = $("#type-text").text();
      getDataByCity(cityText, yearText, typeText)
        .then((res) => {
          createLayer(res, map, view, timeSlider)
        });

    });
  })

});
