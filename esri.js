$(document).ready(function () {

  return require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/support/webMercatorUtils",
    'esri/widgets/TimeSlider'
  ], function (
    Map,
    MapView,
    webMercatorUtils,
    TimeSlider
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
    $(function () {
      $("#firstDate").datepicker();
    });
    $(function () {
      $("#lastDate").datepicker();
    });
    // var basemapGallery = new BasemapGallery({
    //   view: view,
    //   container: document.createElement("div")
    // });

    // var bgExpand = new Expand({
    //   view: view,
    //   content: basemapGallery
    // });

    $('#city-selected li').on('click', function () {
      typeSelected = $(this).text()
      $("#city-text").html(typeSelected);
    })
    $('#year-selected li').on('click', function () {
      typeSelected = $(this).text()
      $("#year-text").html(typeSelected);
    })
    $('#type-selected li').on('click', function () {
      typeSelected = $(this).text();
      $("#type-filter").html(typeSelected);
    })


    const timeSlider = new TimeSlider({
      container: 'timeSlider',
      playRate: 50,
      stops: {
        interval: {
          value: 1,
          unit: 'hours'
        }
      }
    });
    view.on('drag', (e) => {
      console.log(view.extent)
      view.hitTest(e).then(res => {
        console.log(res)
      })
    })
    view.ui.add(timeSlider, 'manual');
    $(".fa-search").on('click', () => {
      let startDate = $("#firstDate").val();
      let endDate = $("#lastDate").val();
      let yearText = $("#year-text").text();
      let crimeType = $("#type-text").text();
      let latLonMin = webMercatorUtils.xyToLngLat(view.extent.xmin, view.extent.ymin);
      let latLonMax = webMercatorUtils.xyToLngLat(view.extent.xmax, view.extent.ymax);
      getDataByCity('phoenix', startDate, endDate, latLonMax[1], latLonMax[0], latLonMin[1], latLonMin[0], typeSelected)
        .then((res) => {
          createLayer(res, map, view, timeSlider, startDate, endDate)
        });

    });
  });
});
