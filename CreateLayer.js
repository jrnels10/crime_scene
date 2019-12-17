async function createLayer(data, map, view, timeSlider, yearText) {
    var layer;
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
        var gLayer = new GraphicsLayer();
        const fields = [
            new Field({
                name: 'ObjectID',
                alias: 'ObjectID',
                type: 'oid'
            }),
            new Field({
                name: 'Address',
                alias: 'Address',
                type: 'string'
            }),
            new Field({
                name: 'Type',
                alias: 'Category',
                type: 'string'
            }),
            new Field({
                name: 'OccurredOn',
                alias: 'OccurredOn',
                type: 'long'
            }),
            new Field({
                name: 'OccurredTo',
                alias: 'OccurredTo',
                type: 'long'
            })
        ];


        data.map(item => {
            if (item.Date !== null) {
                // console.log(item.Date)

                var g = new Graphic({
                    geometry: {
                        type: 'point', // autocasts as new Point()
                        longitude: item.Longitude,
                        latitude: item.Latitude
                    },
                    attributes: Object.assign(item, { OccurredOn: new Date(0).setUTCSeconds(item.Date), OccurredTo: new Date(0).setUTCSeconds(item.Date) })
                });
                gLayer.add(g);
            }
        });


        layer = new FeatureLayer({
            source: gLayer.graphics,
            objectIdField: 'id',
            title: 'Theft',
            fields: fields,
            geometryType: 'point',
            timeInfo: {
                startField: 'OccurredOn', // name of the date field
                endField: "OccurredTo", // name of the date field
                interval: {
                    // set time interval to one day
                    unit: 'years',
                    value: 1
                }
            }
        });


        // debugger
        layer.popupTemplate = {
            title: '{Address}',
            content: [
                {
                    type: 'fields',
                    fieldInfos: [
                        {
                            fieldName: 'Type',
                            label: 'Type'
                        },
                        {
                            fieldName: 'OccurredOn',
                            label: 'OccurredOn'
                        }
                    ]
                }
            ]
        };
        const rendererType = {
            theft: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#B8EE30',
                width: '0.5px',
                style: 'circle'
            },
            traffic: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#26DFD0',
                width: '0.5px',
                style: 'circle'
            },
            otherSym: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#27231F',
                width: '0.5px',
                style: 'circle'
            },
            prisonerTrans: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#F9D030',
                width: '0.5px',
                style: 'circle'
            },
            propCrime: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#C8651B',
                width: '0.5px',
                style: 'circle'
            },
            familyOffense: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#DE0001',
                width: '0.5px',
                style: 'circle'
            },
            breakingEntering: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#0000A3',
                width: '0.5px',
                style: 'circle'
            },
            drugs: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#40B0DF',
                width: '0.5px',
                style: 'circle'
            },
            disorder: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#54086B',
                width: '0.5px',
                style: 'circle'
            },
            death: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#D6AD60',
                width: '0.5px',
                style: 'circle'
            },
            liqour: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#4D0011',
                width: '0.5px',
                style: 'circle'
            },
            assualtWeapon: {
                type: 'simple-marker', // autocasts as new SimpleLineSymbol()
                color: '#E4E5E8',
                width: '0.5px',
                style: 'circle'
            }
        }

        const rendererHeat = {
            type: 'heatmap',
            colorStops: [
                { color: 'rgba(63, 40, 102, 0)', ratio: 0 },
                { color: '#472b77', ratio: 0.083 },
                { color: '#4e2d87', ratio: 0.166 },
                { color: '#563098', ratio: 0.249 },
                { color: '#5d32a8', ratio: 0.332 },
                { color: '#6735be', ratio: 0.415 },
                { color: '#7139d4', ratio: 0.498 },
                { color: '#7b3ce9', ratio: 0.581 },
                { color: '#853fff', ratio: 0.664 },
                { color: '#a46fbf', ratio: 0.747 },
                { color: '#c29f80', ratio: 0.83 },
                { color: '#e0cf40', ratio: 0.913 },
                { color: '#ffff00', ratio: 1 }
            ],
            maxPixelIntensity: 25,
            minPixelIntensity: 0
        };

        const renderer = {
            type: 'unique-value',
            defaultSymbol: rendererType.otherSym,
            defaultLabel: 'Test',
            field: 'Type',
            uniqueValueInfos: [
                {
                    value: "Burglary", // code for interstates/freeways
                    symbol: rendererType.theft,
                    label: "Burglary"
                },
                {
                    value: "Traffic", // code for interstates/freeways
                    symbol: rendererType.traffic,
                    label: "traffic"
                },
                {
                    value: "Other", // code for interstates/freeways
                    symbol: rendererType.otherSym,
                    label: "otherSym"
                },
                {
                    value: "Prisoner Trans.", // code for interstates/freeways
                    symbol: rendererType.prisonerTrans,
                    label: "Prisoner Transportation"
                },
                {
                    value: "Property Crime", // code for interstates/freeways
                    symbol: rendererType.propCrime,
                    label: "Property Crime"
                },
                {
                    value: "Breaking & Entering", // code for interstates/freeways
                    symbol: rendererType.breakingEntering,
                    label: "Breaking & Entering"
                },
                {
                    value: "Drugs", // code for interstates/freeways
                    symbol: rendererType.drugs,
                    label: "Drugs"
                },
                {
                    value: "Disorder", // code for interstates/freeways
                    symbol: rendererType.disorder,
                    label: "Disorder"
                },
                {
                    value: "Family Offense", // code for interstates/freeways
                    symbol: rendererType.familyOffense,
                    label: "Family Offense"
                },
                {
                    value: "Death", // code for interstates/freeways
                    symbol: rendererType.death,
                    label: "Death"
                },
                {
                    value: "Liquor", // code for interstates/freeways
                    symbol: rendererType.liqour,
                    label: "Liquor"
                },
                {
                    value: "Assault with Deadly Weapon", // code for interstates/freeways
                    symbol: rendererType.assualtWeapon,
                    label: "Assault with Deadly Weapon"
                }
            ]
        };
        layer.renderer = renderer;
        map.add(layer);
        let typeSelected = '';
        const categories = data.map(item => {
            return item.Type;
        })
        const categoriesList = categories.filter((item, idx) => { return categories.indexOf(item) == idx });

        categoriesList.map(item => {
            const li = $('<li></li>');
            $("#type-selected").append(li.html(item))
        })


        // debugger

        view.whenLayerView(layer).then(function (lv) {
            layerView = lv;

            // start time of the time slider - 5/25/2019
            const start = new Date('2017', 11, 12);
            // set time slider's full extent to
            // 5/25/5019 - until end date of layer's fullTimeExtent
            timeSlider.fullTimeExtent = {
                start: start,
                end: layer.timeInfo.fullTimeExtent.end
            };

            // We will be showing earthquakes with one day interval
            // when the app is loaded we will show earthquakes that
            // happened between 5/25 - 5/26.
            const end = new Date(start);
            // end of current time extent for time slider
            // showing earthquakes with one day interval
            end.setDate(end.getDate() + 1);

            // Values property is set so that timeslider
            // widget show the first day. We are setting
            // the thumbs positions.
            timeSlider.values = [start, end];
        });

        // watch for time slider timeExtent change
        timeSlider.watch("timeExtent", function () {
            // only show earthquakes happened up until the end of
            // timeSlider's current time extent.
            layer.definitionExpression =
                `OccurredOn <= '${timeSlider.timeExtent.end.getTime()}'`

            // now gray out earthquakes that happened before the time slider's current
            // timeExtent... leaving footprint of earthquakes that already happened
            layerView.effect = {
                filter: {
                    timeExtent: timeSlider.timeExtent,
                    geometry: view.extent
                },
                excludedEffect: "grayscale(20%) opacity(15%)"
            };

            // // // // wait till the layer view is loaded
            // view.whenLayerView(lyr).then(function (lv) {
            //   layerView = lv;
            //   const start = new Date(2009, 4, 25);
            //   timeSlider.fullTimeExtent = {
            //     start: lyr.timeInfo.fullTimeExtent.start,
            //     end: new Date()
            //   };
            //   const end = new Date(start);
            //   end.setDate(end.getDate() + 100);
            //   timeSlider.values = [start, end];
            // });

            // // watch for time slider timeExtent change
            // timeSlider.watch('timeExtent', function () {
            //   `OccurredOn <= '${timeSlider.timeExtent.start.getTime()}'`
            //   layerView.effect = {
            //     filter: {
            //       timeExtent: timeSlider.timeExtent,
            //       geometry: view.extent
            //     },
            //     excludedEffect: 'grayscale(20%) opacity(12%)'
            //   };
            // });
        })
        return view;


    });
}