$(document).ready(function () {
    require(['esri/widgets/LayerList'], function (LayerList) {
        var layerList = new LayerList({
            view: view
        });
        // Adds widget below other elements in the top left corner of the view
        view.ui.add(layerList, {
            position: "top-right"
        });
    });
})
