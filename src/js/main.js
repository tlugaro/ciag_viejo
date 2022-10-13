$('#highcharts-figure').addClass('desactive');
$(document).ready(function () {
    $("#highcharts-figure").mCustomScrollbar({
        theme: "minimal"
    });

    $('#varast').on('click', function () {
        event.preventDefault();
        $.ajax({
            url: "static/capas/Variables astronómicas_puntos.geojson",

            success: function (data) {

                var puntos = new L.geoJson((data), {
                        style: style1,
                        onEachFeature: onEachFeature

                    }
                ).addTo(layerGroup);

                map.addLayer(layerGroup);
                puntos.bindTooltip(
                    function (layer) {
                        let div = L.DomUtil.create('div');

                        let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                        let fields = ["ID"];
                        let aliases = ["º Sur"];
                        let table = '<table>' +
                            String(
                                fields.map(
                                    (v, i) =>
                                        `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                            + '</table>';
                        div.innerHTML = table;

                        return div
                    }
                    , {"className": "foliumtooltip", "sticky": true});

                $('#highcharts-figure').addClass('active');
                $('#sidebar').removeClass('active');

            },
        });
        $.ajax({
        url: "static/capas/Variables astronómicas.geojson",

            success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style_varast,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["ID"];
                    let aliases = ["º Sur"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});
        }
    });

    })
    function onEachFeature(feature, puntos) {
        puntos.on('click', function (e) {
            lat = (feature.properties.ID);
            console.log(name);
            //or
            if (lat == "25") {
                chart.update({
                    subtitle: {
                        text: '25° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [10.4,10.7,11.3,12.0,12.7,13.3,13.6,13.3,12.7,12.0,11.3,10.7,10.4],
                            color: '#f5d33b',

                        },{
                            name: 'F',
                            data: [11.4,11.6,12.2,12.9,13.7,14.3,14.6,14.3,13.6,12.9,12.2,11.6,11.4],
                            color:'#2F6F3A',

                        },{
                            name: 'RA',
                            yAxis: 1,
                            data: [21.3,23.0,27.9,34.0,39.0,42.2,43.2,42.3,39.2,34.4,28.2,23.2,21.3],
                            color:'#8F1D1D',


                        }
                    ],
                });
            }
            if (lat == "30") {
                chart.update({
                    subtitle: {
                        text: '30° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [10.1, 10.3, 11.1, 12.0, 12.9, 13.7, 13.9, 13.6, 12.9, 12.0, 11.1, 10.4, 10.1],
                            color: '#f5d33b',
                        }, {
                            name: 'F',
                            data: [11.1, 11.3, 12.0, 12.9, 13.9, 14.7, 15.0, 14.6, 13.8, 12.9, 12.0, 11.4, 11.1],
                            color: '#2F6F3A',
                        }, {
                            name: 'RA',
                            data: [18.4, 20.3, 25.6, 32.5, 38.6, 42.6, 43.9, 42.7, 38.6, 32.9, 25.8, 20.5, 18.4],
                            color: '#8F1D1D',
                            yAxis: 1,


                        }
                    ],
                });
            }

            if (lat == "35") {
                chart.update({
                    subtitle: {
                        text: '35° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [9.6,10.0,10.9,12.0,13.1,14.0,14.4,14.0,13.1,12.0,10.9,10.0,9.6],
                            color: '#f5d33b',
                        },{
                            name: 'F',
                            data: [10.7,11.1,11.9,13.0,14.1,15.1,15.5,15.1,14.1,13.0,11.9,11.1,10.7],
                            color:'#2F6F3A',
                        },{
                            name: 'RA',
                            data: [15.6,17.5,23.1,30.8,37.8,42.7,44.4,42.8,37.8,31.2,23.4,17.7,15.6],
                            color:'#8F1D1D',
                            yAxis: 1,


                        }
                    ],
                });
            }

            if (lat == "40") {
                chart.update({
                    subtitle: {
                        text: '40° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [9.2,9.6,10.7,12.0,13.4,14.4,14.8,14.4,13.3,12.0,10.7,9.6,9.2],
                            color: '#f5d33b',
                        },{
                            name: 'F',
                            data: [10.3,10.7,11.7,13.1,14.5,15.6,16.1,15.6,14.4,13.1,11.7,10.7,10.3],
                            color:'#2F6F3A',
                        },{
                            name: 'RA',
                            data: [12.7,14.6,20.5,28.8,36.8,42.6,44.7,42.6,36.7,29.2,20.7,14.8,12.7],
                            color:'#8F1D1D',
                            yAxis:1,


                        }
                    ],
                });
            }

            if (lat == "45") {
                chart.update({
                    subtitle: {
                        text: '45° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [8.6,9.1,10.4,12.0,13.6,14.9,15.4,14.9,13.5,12.0,10.4,9.1,8.6],
                            color: '#f5d33b',
                        },{
                            name: 'F',
                            data: [9.9,10.4,11.6,13.2,14.8,16.3,16.9,16.2,14.7,13.2,11.6,10.4,9.9],
                            color:'#2F6F3A',
                        },{
                            name: 'RA',
                            data: [9.8,11.7,17.8,26.6,35.5,42.3,44.7,42.2,35.3,27.0,17.9,11.9,9.8],
                            color:'#8F1D1D',
                            yAxis:1,

                        }
                    ],
                });
            }
            if (lat == "50") {
                chart.update({
                    subtitle: {
                        text: '50° S'
                    },
                    series: [

                        {
                            name: 'HA',
                            data: [7.9,8.5,10.1,12.0,13.9,15.5,16.1,15.4,13.8,12.0,10.1,8.5,7.9],
                            color: '#f5d33b',
                        },{
                            name: 'F',
                            data: [9.4,9.9,11.4,13.3,15.3,17.1,17.9,17.0,15.1,13.3,11.4,10.0,9.4],
                            color:'#2F6F3A',
                        },{
                            name: 'RA',
                            data: [7.0,8.9,14.9,24.3,34.0,41.8,44.6,41.6,33.8,24.5,15.1,9.1,7.0],
                            color:'#8F1D1D',
                            yAxis:1,



                        }
                    ],
                });
            }
        });
    }
});

$('#sidebar').addClass('active');
$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');

    });

    $('#sidebarCollapse').on('click', function () {
        $('#highcharts-figure').removeClass('active');
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');

    });
});



var map = L.map('content', { zoomControl:false, minZoom: 4, zoomSnap: 0.25 }).setView([-38.86, -74.33], 4.5);

var all = L.layerGroup().addTo(map)



L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    {"attribution": "\u003ca href=\"http://www.ciag.com.ar\" target=\"_blank\"\u003eCIAg\u003c/a\u003e | \u003ca href=\"http://www.ign.gob.ar\" target=\"_blank\"\u003eInstituto Geogr\u00e1fico Nacional\u003c/a\u003e + \u003ca href=\"http://www.osm.org/copyright\" target=\"_blank\"\u003eOpenStreetMap\u003c/a\u003e", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "z-index":900, "minZoom": 4, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
).addTo(map);



function onEachFeature(feature, layer) {
    layer.on({
    });
};

//Humedad
function getColor4(d) {
    return d > 90.0? '#08306b' :
        d > 80.0 ? '#105ca5' :
            d > 70.0 ? '#3182be' :
                d > 60.0 ? '#5ba3d0' :
                    d > 50.0  ? '#8fc2de' :
                        d > 40.0  ? '#bed8ed' :
                            d > 30.0  ? '#dceaf7' :
                                '#f7fbff';

}

function style4(feature4) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColor4(feature4.properties.HR),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColor4(feature4.properties.HR)
    };
}
//Radiacion
function getColor3(d) {
    return d > 30.0? '#8e1db7' :
        d > 29.0 ? '#902688' :
        d > 28.0 ? '#912b71' :
            d > 27.0 ? '#922f5a' :
                d > 26.0 ? '#933442' :
                    d > 25.0 ? '#93382b' :
                        d > 24.0 ? '#943d14' :
                            d > 23.0 ? '#974103' :
                                d > 22.0  ? '#9f4505' :
                                    d > 21.0 ? '#a64808' :
                                        d > 20.0  ? '#ae4c0a' :
                                            d > 19.0 ? '#b5500d' :
                                                d > 18.0  ? '#bd530f' :
                                                    d > 17.0  ? '#c55711' :
                                                        d > 16.0  ? '#cc5a14' :
                                                            d > 15.0  ? '#d2601b' :
                                                                d > 14.0  ? '#d76926' :
                                                                    d > 13.0  ? '#db7232' :
                                                                        d > 12.0  ? '#df7a3d' :
                                                                            d > 11.0  ? '#e38349' :
                                                                                d > 10.0  ? '#e88b54' :
                                                                                    d > 9.0  ? '#ec9460' :
                                                                                        d > 8.0  ? '#f09c6b' :
                                                                                            d > 7.0  ? '#f3a87c' :
                                                                                                d > 6.0  ? '#f5b48f' :
                                                                                                    d > 5.0  ? '#f6c1a2' :
                                                                                                        d > 4.0  ? '#f8cdb4' :
                                                                                                            d > 3.0  ? '#fadac7' :
                                                                                                                d > 2.0  ? '#fce6da' :
                                                                                                                    d > 1.0  ? '#fdf3ec' :
                                                                                                                        d > 0.0  ? '#ffffff' :
                                                                                                                            '#ffffff';

}

function style3(feature3) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColor3(feature3.properties.DN),
        dashArray: '1',
        fillOpacity: 0.9,
        fillColor: getColor3(feature3.properties.DN)
    };
}
//EP media anual
function getColorep(d) {
    return d > 1900.0 ? '#00441b' :
        d > 1800.0 ? '#0e612c' :
            d > 1700.0 ? '#1d7f3e' :
                d > 1600.0 ? '#279049' :
                    d > 1500.0 ? '#37a155' :
                        d > 1400.0 ? '#3fa95c' :
                            d > 1300.0 ? '#4eb264' :
                                d > 1200.0 ? '#60ba6c' :
                                    d > 1100.0 ? '#71c375' :
                                        d > 1000.0 ? '#7cc87c' :
                                            d > 900.0 ? '#8ed08b' :
                                                d > 800.0 ? '#97d492' :
                                                    d > 700.0 ? '#a0d99a' :
                                                        d > 600.0 ? '#a9db97' :
                                                            d > 500.0 ? '#b3dd91' :
                                                                d > 400.0 ? '#bcdf8c' :
                                                                    d > 300.0 ? '#d0e381' :
                                                                        d > 200.0 ? '#d9e57c' :
                                                                            d > 100.0 ? '#ece972' :
                                                                                d > 1.0 ? '#f6ea6c' :
                                                                                    '#ffec67';

}

function styleep(feature2) {
    return {
        weight: 1,
        opacity: 0.8,
        color: '#fff',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorep(feature2.properties.DN)
    };
}

//deficits mensual
function getColordef(d) {
    return d > 170.0 ? '#8b4703' :
        d > 160.0 ? '#a6611a' :
            d > 150.0 ? '#b47933' :
                d > 140.0 ? '#c3924c' :
                    d > 130.0 ? '#d1aa64' :
                        d > 120.0 ? '#dfc27d' :
                            d > 110.0 ? '#e5cf8c' :
                                d > 100.0 ? '#eadc9b' :
                                    d > 90.0 ? '#f0e8a9' :
                                        d > 80.0 ? '#f5f5b8' :
                                            d > 70.0 ? '#d8eaa6' :
                                                d > 60.0 ? '#bae093' :
                                                    d > 50.0 ? '#9dd581' :
                                                        d > 40.0 ? '#80cb6e' :
                                                            d > 30.0 ? '#60a653' :
                                                                d > 20.0 ? '#408137' :
                                                                    d > 10.0 ? '#215b1c' :
                                                                        d > 1.0 ? '#013500' :
                                                                            '#022c01';

}

function styledef(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColordef(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColordef(feature2.properties.DN)
    };
}
//deficits anual
function getColordefanual(d) {
    return d > 1100.0 ? '#8b4703' :
                d > 1000.0 ? '#a6611a' :
                    d > 900.0 ? '#b47933' :
                        d > 800.0 ? '#d1aa64' :
                            d > 700.0 ? '#dfc27d' :
                                d > 600.0 ? '#f5f5b8' :
                                    d > 500.0 ? '#d8eaa6' :
                                        d > 400.0 ? '#bae093' :
                                            d > 300.0 ? '#9dd581' :
                                                d > 200.0 ? '#60a653' :
                                                    d > 100.0 ? '#215b1c' :
                                                        d > 1.0 ? '#013500' :
                                                            '#022c01';

}

function styledefanual(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColordefanual(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColordefanual(feature2.properties.DN)
    };
}
//excesos anual
function getColorexcanual(d) {
    return d > 1200.0 ? '#3f007d' :
        d > 1100.0 ? '#4b1788' :
            d > 1000.0 ? '#572c91' :
                d > 900.0 ? '#5f3c99' :
                    d > 800.0 ? '#684da1' :
                        d > 700.0 ? '#7464ad' :
                            d > 600.0 ? '#817eba' :
                                d > 500.0 ? '#8e8bc1' :
                                        d > 400.0 ? '#a9a7d0' :
                                            d > 300.0 ? '#b7b7d9' :
                                                d > 200.0 ? '#c5c5e0' :
                                                    d > 100.0 ? '#d2d2e7' :
                                                        d > 1.0 ? '#f4f4fa' :
                                                            '#ffffff';

}

function styleexcanual(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColorexcanual(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorexcanual(feature2.properties.DN)
    };
}
//excesos mensual
function getColorexc(d) {
    return d > 170.0 ? '#3f007d' :
                d > 160.0 ? '#4b1788' :
                    d > 150.0 ? '#572c91' :
                        d > 140.0 ? '#5f3c99' :
                            d > 130.0 ? '#684da1' :
                                d > 120.0 ? '#7464ad' :
                                    d > 110.0 ? '#817eba' :
                                        d > 100.0 ? '#8e8bc1' :
                                            d > 90.0 ? '#9c98c7' :
                                                d > 80.0 ? '#a9a7d0' :
                                                    d > 70.0 ? '#b7b7d9' :
                                                        d > 60.0 ? '#c5c5e0' :
                                                            d > 50.0 ? '#d2d2e7' :
                                                                d > 40.0 ? '#dedeed' :
                                                                    d > 30.0 ? '#e7e6f1' :
                                                                        d > 20.0 ? '#e7e6f1' :
                                                                            d > 10.0 ? '#efeef6' :
                                                                                d > 1.0 ? '#f4f4fa' :
                                                                                    '#ffffff';

}

function styleexc(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColorexc(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorexc(feature2.properties.DN)
    };
}
//EP media mensual
function getColorepmen(d) {
    return d > 230.0 ? '#00441b' :
        d > 220.0 ? '#0e612c' :
            d > 210.0 ? '#1d7f3e' :
                d > 200.0 ? '#279049' :
                    d > 190.0 ? '#2f994f' :
                        d > 180.0 ? '#37a155' :
                            d > 170.0 ? '#3fa95c' :
                                d > 160.0 ? '#4eb264' :
                                    d > 150.0 ? '#60ba6c' :
                                        d > 140.0 ? '#71c375' :
                                            d > 130.0 ? '#7cc87c' :
                                                d > 120.0 ? '#85cc84' :
                                                    d > 110.0 ? '#8ed08b' :
                                                        d > 100.0 ? '#97d492' :
                                                            d > 90.0 ? '#a0d99a' :
                                                                d > 80.0 ? '#a9db97' :
                                                                    d > 70.0 ? '#b3dd91' :
                                                                        d > 60.0 ? '#bcdf8c' :
                                                                            d > 50.0 ? '#c6e187' :
                                                                                d > 40.0 ? '#d0e381' :
                                                                                    d > 30.0 ? '#d9e57c' :
                                                                                        d > 20.0 ? '#e3e777' :
                                                                                            d > 10.0 ? '#ece972' :
                                                                                                d > 1.0 ? '#f6ea6c' :
                                                                                                    '#ffec67';

}

function styleepmen(feature2) {
    return {
        weight: 1,
        opacity: 0.8,
        color: '#fff',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorepmen(feature2.properties.DN)
    };
}
// ETR MENSUAL
//EP media mensual
function getColorermen(d) {
    return d > 140.0 ? '#00441b' :
        d > 130.0 ? '#0e612c' :
            d > 120.0 ? '#1d7f3e' :
                        d > 110.0 ? '#37a155' :
                                d > 100.0 ? '#4eb264' :
                                        d > 90.0 ? '#71c375' :
                                                d > 80.0 ? '#85cc84' :
                                                        d > 70.0 ? '#97d492' :
                                                                d > 60.0 ? '#a9db97' :
                                                                        d > 50.0 ? '#bcdf8c' :
                                                                            d > 40.0 ? '#c6e187' :
                                                                                d > 30.0 ? '#d0e381' :
                                                                                        d > 20.0 ? '#e3e777' :
                                                                                            d > 10.0 ? '#ece972' :
                                                                                                d > 1.0 ? '#f6ea6c' :
                                                                                                    '#ffec67';

}

function styleermen(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: '#fff',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorermen(feature2.properties.DN)
    };
}
//deficit de presion de vapor media anual
//tension de vapor media anual
function getColordpvanual(d) {
    return d > 17.0 ? '#fdfdfd' :
                d > 16.0 ? '#f1f9e2' :
                    d > 15.0 ? '#e5f4c6' :
                        d > 14.0 ? '#d8efaa' :
                            d > 13.0 ? '#ccea8e' :
                                d > 12.0 ? '#c0e572' :
                                    d > 11.0 ? '#b2e066' :
                                        d > 10.0 ? '#a4db6b' :
                                            d > 9.0 ? '#95d770' :
                                                d > 8.0 ? '#89d478' :
                                                    d > 7.0 ? '#80d581' :
                                                        d > 6.0 ? '#76d58a' :
                                                            d > 5.0 ? '#6dd593' :
                                                                d > 4.0 ? '#63d097' :
                                                                    d > 3.0 ? '#56bd8c' :
                                                                        d > 2.0 ? '#49aa80' :
                                                                            d > 1.0 ? '#3b9675' :
                                                                                '#2e836a';

}

function styledpvanual(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColordpvanual(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColordpvanual(feature2.properties.DN)
    };
}
//tension de vapor media anual
function getColortvp(d) {
    return d > 26.0 ? '#013968' :
        d > 25.0 ? '#053f70' :
            d > 24.0 ? '#094478' :
                d > 23.0 ? '#0e4a80' :
                    d > 22.0 ? '#125087' :
                        d > 21.0 ? '#16568f' :
                            d > 20.0 ? '#1b5b97' :
                                d > 19.0 ? '#2566a0' :
                                    d > 18.0 ? '#3172a8' :
                                        d > 17.0 ? '#3d7eb1' :
                                            d > 16.0 ? '#498bba' :
                                                d > 15.0 ? '#5597c2' :
                                                    d > 14.0 ? '#61a3cb' :
                                                        d > 13.0 ? '#6bafc9' :
                                                            d > 12.0 ? '#75bcbe' :
                                                                d > 11.0 ? '#7ec8b2' :
                                                                    d > 10.0 ? '#87d5a6' :
                                                                        d > 9.0 ? '#90e29b' :
                                                                            d > 8.0 ? '#99ee8f' :
                                                                                d > 7.0 ? '#a2f885' :
                                                                                    d > 6.0 ? '#aaf982' :
                                                                                        d > 5.0 ? '#b1fa7f' :
                                                                                            d > 4.0 ? '#b9fc7c' :
                                                                                                d > 3.0 ? '#c1fd79' :
                                                                                                    d > 2.0 ? '#c9fe76' :
                                                                                                        d > 1.0 ? '#d0ff73' :
                                                                                                            '#d0ff73';

}

function styletvp(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColortvp(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColortvp(feature2.properties.DN)
    };
}

//Precipitacion media anual
function getColor2(d) {
    return d > 2100.0? '#08314C' :
        d > 2000.0 ? '#093756' :
            d > 1900 ? '#0D4266' :
                d > 1800.0 ? '#0D4B75' :
                    d > 1700.0  ? '#125987' :
                        d > 1600.0  ? '#1A5F8D' :
                            d > 1500.0  ? '#226693' :
                                d > 1400.0  ? '#2A6D99' :
                                    d > 1300.0  ? '#3375A1' :
                                        d > 1200.0  ? '#407FAA' :
                                            d > 1100.0 ? '#4583AE':
                                                d > 1000.0 ? '#4A88B2':
                                                    d > 900.0  ? '#5491BA' :
                                                        d > 800.0  ? '#649EC6' :
                                                            d > 700.0  ? '#7AAACD' :
                                                                d > 600.0  ? '#A5C9E3' :
                                                                    d > 500.0  ? '#CAE7FC' :
                                                                        d > 400.0  ? '#FFEC9D' :
                                                                            d > 300.0  ? '#D7AB68' :
                                                                                d > 200.0  ? '#B98959' :
                                                                                    d > 100.0  ? '#AF6E2E' :
                                                                                        d>5.0 ? '#A55809':
                                                                                        '#8B4B09';

}

function style2(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColor2(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColor2(feature2.properties.DN)
    };
}
//Precipitación mensual
function getColorppmensual(d) {
    return d > 230.0? '#08314C' :
        d > 220.0 ? '#0D4266' :
            d > 200.0 ? '#0D4B75' :
                d > 180.0  ? '#1B689C' :
                    d > 160.0  ? '#2276AF' :
                        d > 140.0  ? '#4084B2' :
                            d > 120.0  ? '#649EC6' :
                                d > 100.0  ? '#CAE7FC' :
                                    d > 80.0  ? '#FFEC9D' :
                                        d > 60.0  ? '#D7AB68' :
                                            d > 40.0  ? '#AF6E2E' :
                                                d > 20.0  ? '#A55809' :
                                                    d > 0.0 ?'#814609':
                                                        '#683806';
                                                       

}
function styleppmens(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColorppmensual(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorppmensual(feature2.properties.DN)
    };
}
//Precipitación trim
function getColorpptrim(d) {
    return d > 600.0? '#08314C' :
        d > 550.0 ? '#0D4266' :
            d > 500.0 ? '#0D4B75' :
                d > 450.0  ? '#1B689C' :
                    d > 400.0  ? '#2276AF' :
                        d > 350.0  ? '#4084B2' :
                            d > 300.0  ? '#649EC6' :
                                d > 250.0  ? '#CAE7FC' :
                                    d > 200.0  ? '#FFEC9D' :
                                        d > 150.0  ? '#D7AB68' :
                                            d > 100.0  ? '#AF6E2E' :
                                                d > 50.0  ? '#A55809' :
                                                    '#814609';

}
function stylepptrim(feature2) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColorpptrim(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorpptrim(feature2.properties.DN)
    };
}

//Agua util
function getColoraguautil(d) {
    return d > 95.0 ? '#08306b' :
        d > 90.0 ? '#07332C' :
            d > 80.0 ? '#135943' :
                d > 70.0 ? '#0A8838' :
                    d > 60.0 ? '#3da82a' :
                        d > 50.0 ? '#A3F32F' :
                            d > 40.0 ? '#D5FA79' :
                                d > 30.0 ? '#F7FF82' :
                                    d > 20.0 ? '#F4D629' :
                                        d > 10.0 ? '#FCA029' :
                                            d > 0.0 ? '#B2381C' :

                                                '#8c240c';

}
function styleaguautil(feature2) {
    return {
        weight: 1.9,
        opacity: 0.8,
        color: getColoraguautil(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColoraguautil(feature2.properties.DN)
    };
}
//Temperatura
function getColortmax(d) {
    return  d > 35.0 ? '#35070c' :
                d > 34.0 ? '#42060e' :
                    d > 33.0 ? '#4f040f' :
                        d > 32.0 ? '#5c0211' :
                            d > 31.0 ? '#690112' :
                                d > 30.0 ? '#740014' :
                                    d > 29.0 ? '#7b0015' :
                                        d > 28.0 ? '#830016' :
                                            d > 27.0 ? '#8b0017' :
                                                d > 26.0 ? '#960018' :
                                                    d > 25.0 ? '#a3001a' :
                                                        d > 24.0 ? '#b0001c' :
                                                            d > 23.0 ? '#bd001e' :
                                                                d > 22.0 ? '#ca0020' :
                                                                    d > 21.0 ? '#ce0f22' :
                                                                        d > 20.0 ? '#d72c25' :
                                                                            d > 19.0 ? '#da3326' :
                                                                                d > 18.0 ? '#dc3a27' :
                                                                                    d > 17.0 ? '#de4128' :
                                                                                        d > 16.0 ? '#e04829' :
                                                                                            d > 15.0 ? '#e24f2a' :
                                                                                                d > 14.0 ? '#e65a2b' :
                                                                                                    d > 13.0 ? '#ea672d' :
                                                                                                        d > 12.0 ? '#ee742f' :
                                                                                                            d > 11.0 ? '#f18031' :
                                                                                                                d > 10.0 ? '#f58d33' :
                                                                                                                    d > 9.0 ? '#f89835' :
                                                                                                                        d > 8.0 ? '#f79e3a' :
                                                                                                                            d > 7.0 ? '#f6a33e' :
                                                                                                                                d > 6.0 ? '#f5a942' :
                                                                                                                                    d > 5.0 ? '#f5af47' :
                                                                                                                                        d > 4.0 ? '#f4b54b' :
                                                                                                                                            d > 3.0 ? '#f3bc54' :
                                                                                                                                                d > 2.0 ? '#f6cc7e' :
                                                                                                                                                    d > 1.0 ? '#f9dda7' :
                                                                                                                                                        d > 0.0 ? '#fcedd1' :
                                                                                                                                                            d > -1.0 ? '#fffdfb' :
                                                                                                                                                                d > -2.0 ? '#1b7db7' :
                                                                                                                                                                    '#0e689a';
}

function styletmax(feature1) {
    return {
        weight: 1.9,
        opacity: 0.8,
        color: getColortmax(feature1.properties.DN),
        dashArray: '1',
        fillOpacity: 0.9,
        fillColor: getColortmax(feature1.properties.DN)
    };
}
function getColortmin(d) {
    return d > 24.0 ? '#ca0020' :
                            d > 23.0 ? '#ce0c22' :
                                d > 22.0 ? '#d21823' :
                                    d > 21.0 ? '#d52525' :
                                        d > 20.0 ? '#d93126' :
                                            d > 19.0 ? '#dd3d28' :
                                                d > 18.0 ? '#e14929' :
                                                    d > 17.0 ? '#e4552b' :
                                                        d > 16.0 ? '#e75f2c' :
                                                            d > 15.0 ? '#ea692d' :
                                                                d > 14.0 ? '#ed732f' :
                                                                    d > 13.0 ? '#f17d30' :
                                                                        d > 12.0 ? '#f48832' :
                                                                            d > 11.0 ? '#f79233' :
                                                                                d > 10.0 ? '#f89936' :
                                                                                    d > 9.0 ? '#f79f3a' :
                                                                                        d > 8.0 ? '#f6a43f' :
                                                                                            d > 7.0 ? '#f5a943' :
                                                                                                d > 6.0 ? '#f5af47' :
                                                                                                    d > 5.0 ? '#f4b44b' :
                                                                                                        d > 4.0 ? '#f3ba4f' :
                                                                                                            d > 3.0 ? '#f6c975' :
                                                                                                                d > 2.0 ? '#f8d99e' :
                                                                                                                    d > 1.0 ? '#fbe9c7' :
                                                                                                                        d > 0.0 ? '#fef9f0' :
                                                                                                                            d > -1.0 ? '#ebf4f9' :
                                                                                                                                d > -2.0 ? '#cbe2ef' :
                                                                                                                                    d > -3.0 ? '#abcfe5' :
                                                                                                                                        d > -4.0 ? '#8bbdda' :
                                                                                                                                            d > -5.0 ? '#6babd0' :
                                                                                                                                                d > -6.0 ? '#4b99c6' :
                                                                                                                                                    d > -7.0 ? '#2b87bc' :
                                                                                                                                                        d > -8.0 ? '#0b75b2' :
                                                                                                                                                            d > -9.0 ? '#056eab' :
                                                                                                                                                                d > -10.0 ? '#046aa6' :
                                                                                                                                                                    d > -11.0 ? '#0467a0':
                                                                                                                                                                        d > -12.0 ? '#04639a' :
                                                                                                                                                                            d > -13.0 ? '#045f94' :
                                                                                                                                                                                d > -14.0 ? '#035c8f' :
                                                                                                                                                                                    '#035889';
}

function styletmin(feature1) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColortmin(feature1.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColortmin(feature1.properties.DN)
    };
}
function getColor1(d) {
    return d > 29.0 ? '#35070c' :
        d > 28.0 ? '#42060e' :
            d > 27.0 ? '#4f040f' :
                d >26.0 ? '#5c0211' :
                    d > 25.0 ? '#690112' :
                        d > 24.0 ? '#740014' :
                            d > 23.0 ? '#8d0017' :
                                 d > 22.0 ? '#920018' :
                                    d > 21.0 ? '#9d0019' :
                                        d > 20.0 ? '#a3001a' :
                                             d > 19.0 ? '#b0001c' :
                                                d > 18.0 ? '#bf001e' :
                                                    d > 17.0 ? '#c6001f' :
                                                        d > 16.0 ? '#d11523' :
                                                            d > 15.0 ? '#d52424' :
                                                                    d > 14.0 ? '#de4228' :
                                                                        d > 13.0 ? '#e3512a' :
                                                                                d > 12.0 ? '#ec6d2e' :
                                                                                    d > 11.0 ? '#f07b30' :
                                                                                        d > 10.0 ? '#f48932' :
                                                                                            d > 9.0 ? '#f89634' :
                                                                                                d > 8.0 ? '#f79d3a' :
                                                                                                    d > 7.0 ? '#f6a43f' :
                                                                                                        d > 6.0 ? '#f5ab44' :
                                                                                                            d > 5.0 ? '#f4b249' :
                                                                                                                d > 4.0 ? '#f3b94e' :
                                                                                                                    d > 3.0 ? '#f5c66e' :
                                                                                                                        d > 2.0 ? '#f8d493' :
                                                                                                                            d > 1.0 ? '#fae3b7' :
                                                                                                                                d > 0.0 ? '#fdf1db' :
                                                                                                                                    d > -1.0 ? '#ffffff' :
                                                                                                                                        d > -2.0 ? '#b8d7e9' :
                                                                                                                                            d > -3.0 ? '#70aed2' :
                                                                                                                                                d > -4.0 ? '#2986bc' :
                                                                                                                                                    d > -5.0 ? '#046eab' :
                                                                                                                                                        d > -6.0 ? '#0468a2' :
                                                                                                                                                            '#035889';
}

function style1(feature1) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColor1(feature1.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColor1(feature1.properties.DN)
    };
}
function styleprov() {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: 	"#ffffff",
        dashArray: '1',
        fillOpacity: 0,
        fillColor: 	"#00FF00"
    };
}
function style_varast(){
    return {
        weight: 4,
        opacity: 0.8,
        color: 	"#05131c",
        dashArray: '1',
        fillOpacity: 0,
        fillColor: 	"#05131c"
    };
}
var layerGroup = L.layerGroup();
var legend = L.control({position: 'bottomright'});

var prov= new L.geoJson( provincias, {
    style: styleprov,
    onEachFeature: onEachFeature

})


var baseMaps = {

};

var overlayMaps = {
    "Limites Provinciales": prov
};


$('#downloaderLayer').on("click",function(event) {

    event.preventDefault();
    var elemento = document.getElementById("bd").value
    if (elemento == "") {
        alert("Elije una base de datos!")
        return false
    }
    var elemento2 = document.getElementById("var").value
    if (elemento2 == "") {
        alert("Elije una variable!")
        return false
    }

    var elemento4 = document.getElementById("tp").value
    if (elemento4 == "") {
        alert("Elije un período de tiempo!")
        return false
    }
    var based = ($("#bd option:selected").text()) +"_"+ ($("#var option:selected").text()) +"_"+($("#tp option:selected").text());
    const down  = document.createElement('a');
    down.href= "static/capas/" + based +".geojson";
    down.download= based+".geojson";
    document.body.appendChild(down);
    down.click();

});

$('#newLayer').on("click",function(event) {
    event.preventDefault();
    $('.loading').addClass('active');
    var elemento = document.getElementById("bd").value
    if (elemento == "") {
        $('.loading').removeClass('active');
        alert("Elije una base de datos!")
        return false
    }
    var elemento2 = document.getElementById("var").value
    if (elemento2 == "") {
        $('.loading').removeClass('active');
        alert("Elije una variable!")
        return false
    }
    var elemento4 = document.getElementById("tp").value
    if ((elemento4 == "")||(elemento4=="------------------")) {
        $('.loading').removeClass('active');
        alert("Elije un período de tiempo!")
        return false
    }
    layerGroup.clearLayers();
    map.removeControl(legend);

    // 1 es powernasa, 2 es SMN, 3 es IGN
    // 1 es anual,2 es semtral, 3 es estacion, 4 es trimestral, 5 es mensual
    var base = ($("#bd").val()) +"_"+ ($("#var").val()) +"_"+($("#variable").val()) +"_"+($("#tp").val());
    var base2 = ($("#bd option:selected").text()) +"_"+ ($("#var option:selected").text()) +"_"+($("#tp option:selected").text());


    if (($("#var option:selected").text())=="Temperatura media" ){
        $.ajax({

            url: "static/capas/" + base2 +".geojson",

            success: function (data) {

                var geojson = new L.geoJson((data), {
                        style: style1,
                        onEachFeature: onEachFeature

                    }
                ).addTo(layerGroup);

                map.addLayer(layerGroup);
                geojson.bindTooltip(
                    function (layer) {
                        let div = L.DomUtil.create('div');

                        let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                        let fields = ["DN"];
                        let aliases = ["ºC"];
                        let table = '<table>' +
                            String(
                                fields.map(
                                    (v, i) =>
                                        `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                            + '</table>';
                        div.innerHTML = table;

                        return div
                    }
                    , {"className": "foliumtooltip", "sticky": true});


                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [-6,-3,-0,3,6,9,12,15,18,21,24,27,30],
                        labels = ['<strong></strong>']
                    title= ["Temperatura media"];

                    // loop through our density intervals and generate a label with a colored square for each interval
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColor1(grades[i]) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? ' ºC' + '<br>' : ' ºC' + '<br>');
                    }

                    return div;
                };

                legend.addTo(map);
                prov.bringToFront();
                $('.loading').removeClass('active');
            }



        });
    }
    else if (($("#var option:selected").text())=="Temperatura máxima") {
        $.ajax({

            url: "static/capas/" + base2 +".geojson",

            success: function (data) {

                var geojson = new L.geoJson((data), {
                        style: styletmax,
                        onEachFeature: onEachFeature

                    }
                ).addTo(layerGroup);

                map.addLayer(layerGroup);
                geojson.bindTooltip(
                    function (layer) {
                        let div = L.DomUtil.create('div');

                        let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                        let fields = ["DN"];
                        let aliases = ["ºC"];
                        let table = '<table>' +
                            String(
                                fields.map(
                                    (v, i) =>
                                        `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                            + '</table>';
                        div.innerHTML = table;

                        return div
                    }
                    , {"className": "foliumtooltip", "sticky": true});


                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [-4,0,4,8,12,16,20,24,28,32,36],
                        labels = ['<strong></strong>']
                    title= ["Temperatura máxima"];

                    // loop through our density intervals and generate a label with a colored square for each interval
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColortmax(grades[i]) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? ' ºC' + '<br>' : ' ºC' + '<br>');
                    }

                    return div;
                };

                legend.addTo(map);
                prov.bringToFront();
                $('.loading').removeClass('active');
            }



        });
    }
    else if (($("#var option:selected").text())=="Temperatura mínima"){
        $.ajax({

            url: "static/capas/" + base2 +".geojson",

            success: function (data) {

                var geojson = new L.geoJson((data), {
                        style: styletmin,
                        onEachFeature: onEachFeature

                    }
                ).addTo(layerGroup);

                map.addLayer(layerGroup);
                geojson.bindTooltip(
                    function (layer) {
                        let div = L.DomUtil.create('div');

                        let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                        let fields = ["DN"];
                        let aliases = ["ºC"];
                        let table = '<table>' +
                            String(
                                fields.map(
                                    (v, i) =>
                                        `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                            + '</table>';
                        div.innerHTML = table;

                        return div
                    }
                    , {"className": "foliumtooltip", "sticky": true});


                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [-14,-10,-6,-2,0,2,6,10,14,18,22,24],
                        labels = ['<strong></strong>']
                    title= ["Temperatura mínima"];

                    // loop through our density intervals and generate a label with a colored square for each interval
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColortmin(grades[i]) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? ' ºC' + '<br>' : ' ºC' + '<br>');
                    }

                    return div;
                };

                legend.addTo(map);
                prov.bringToFront();
                $('.loading').removeClass('active');
            }



        });
    }
    else if ((($("#var option:selected").text())=="Precipitación") && (($("#tp option:selected").text())=="Enero"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Febrero" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Marzo"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Mayo" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Junio"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Julio" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Agosto"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Septiembre" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Octubre"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Noviembre" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Diciembre"||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Abril")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleppmens,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,20,40,60,80,100,120,140,160,180,200,220,240],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorppmensual(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if ((($("#var option:selected").text())=="Precipitación") && (($("#tp option:selected").text())=="Verano"||($("#var option:selected").text())=="Precipitación" && ($("#tp option:selected").text())== "Otoño" ||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Primavera"||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Invierno")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: stylepptrim,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,100,200,300,400,500,600],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorpptrim(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if ((($("#var option:selected").text())=="Precipitación") && (($("#tp option:selected").text())=="Media anual"||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Semestre Cálido"||($("#var option:selected").text())=="Precipitación" &&($("#tp option:selected").text())=="Semestre Frío")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style2,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,300,500,600,900,1200,1500,1800,2100],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor2(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    //deficits anual
    else if ((($("#var option:selected").text())=="Déficits (BHOA)") && (($("#tp option:selected").text())=="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styledefanual,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,200,400,600,800,1000,1200],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColordefanual(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
        //deficits mensual
    else if ((($("#var option:selected").text())=="Déficits (BHOA)") && (($("#tp option:selected").text())!="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styledef,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,20,40,60,80,100,120,140,160,180],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColordef(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    //excesos anual
    else if ((($("#var option:selected").text())=="Excesos (BHOA)") && (($("#tp option:selected").text())=="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleexcanual,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,200,400,600,800,1000,1200,1300],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorexcanual(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    //excesos mensual
    else if ((($("#var option:selected").text())=="Excesos (BHOA)") && (($("#tp option:selected").text())!="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleexc,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,20,40,60,80,100,120,140,160,180],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorexc(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }

    //Evapotranspiración Potencial (Penman Fao)
    else if ((($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)") && (($("#tp option:selected").text())=="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleep,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,200,400,600,800,1000,1200,1500],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorep(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }

    //Evapotranspiración Potencial (Penman Fao) mensual
    else if ((($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)") && (($("#tp option:selected").text())=="Enero"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" && ($("#tp option:selected").text())== "Febrero" ||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Marzo"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" && ($("#tp option:selected").text())== "Mayo" ||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Junio"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" && ($("#tp option:selected").text())== "Julio" ||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Agosto"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" && ($("#tp option:selected").text())== "Septiembre" ||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Octubre"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" && ($("#tp option:selected").text())== "Noviembre" ||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Diciembre"||($("#var option:selected").text())=="Evapotranspiración Potencial (Penman Fao)" &&($("#tp option:selected").text())=="Abril")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleepmen,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,20,40,60,80,100,120,140,160,180,200,220,240],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorepmen(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Radiación global"){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style3,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["MJ/m2 día"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,4,8,12,16,20,24,28,32],
                    labels = ['<strong></strong>']
                title= ["MJ/m2 día"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor3(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' MJ/m2 día' + '<br>' : ' MJ/m2 día +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
        //Evapotranspiración real  anual

    else if ((($("#var option:selected").text())=="Evapotranspiración real (BHOA)") && (($("#tp option:selected").text())=="Media anual")){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleep,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,200,400,600,800,1000,1200,1500],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorep(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm ');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }

    //Evapotranspiración real mensual
    else if ((($("#var option:selected").text())=="Evapotranspiración real (BHOA)") && (($("#tp option:selected").text())=="Enero"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" && ($("#tp option:selected").text())== "Febrero" ||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Marzo"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" && ($("#tp option:selected").text())== "Mayo" ||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Junio"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" && ($("#tp option:selected").text())== "Julio" ||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Agosto"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" && ($("#tp option:selected").text())== "Septiembre" ||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Octubre"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" && ($("#tp option:selected").text())== "Noviembre" ||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Diciembre"||($("#var option:selected").text())=="Evapotranspiración real (BHOA)" &&($("#tp option:selected").text())=="Abril")){$.ajax({
        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleermen,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["mm"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,20,40,60,80,100,120,140],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColorermen(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' mm' + '<br>' : ' mm +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Radiación global"){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style3,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["MJ/m2 día"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,4,8,12,16,20,24,28,32],
                    labels = ['<strong></strong>']
                title= ["MJ/m2 día"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor3(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' MJ/m2 día' + '<br>' : ' MJ/m2 día +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Agua útil (BHOA)"){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styleaguautil,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["%"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,10,20,30,40,50,60,70,80,90,100],
                    labels = ['<strong></strong>']
                title= ["% "];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColoraguautil(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' % ' + '<br>' : ' % ');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Déficit de presión de vapor" ){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styledpvanual,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["hPa"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,3,6,9,12,15,18],
                    labels = ['<strong></strong>']
                title= ["hpa"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColordpvanual(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' hPa' + '<br>' : ' hPa');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Tensión de Vapor"){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: styletvp,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["DN"];
                    let aliases = ["hPa"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,5,10,15,20,25],
                    labels = ['<strong></strong>']
                title= ["hpa"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColortvp(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' hPa' + '<br>' : ' hPa');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }
    else if (($("#var option:selected").text())=="Humedad Relativa"){$.ajax({

        url: "static/capas/" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style4,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["HR"];
                    let aliases = ["%"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,30,40,50,60,70,80,90,100],
                    labels = ['<strong></strong>']
                title= ["%"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor4(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' %' + '<br>' : ' %');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
            $('.loading').removeClass('active');
        }


    });
    }

    else if (($("#var option:selected").text())=="Heliofanía astronómica"){$.ajax({

        url: "static/capas/Variables astronómicas.geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style_varast,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["HA_"+($("#tp option:selected").text())];
                    let aliases = ["Horas"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});
        }
    });
    }
    else if (($("#var option:selected").text())=="Radiación astronómica"){$.ajax({

        url: "static/capas/Variables astronómicas.geojson",

        success: function (data) {

            var geojson = new L.geoJson((data), {
                    style: style_varast,
                    onEachFeature: onEachFeature

                }
            ).addTo(layerGroup);

            map.addLayer(layerGroup);
            geojson.bindTooltip(
                function (layer) {
                    let div = L.DomUtil.create('div');

                    let handleObject = feature => typeof (feature) == 'object' ? JSON.stringify(feature) : feature;
                    let fields = ["RA_"+($("#tp option:selected").text())];
                    let aliases = ["W/m2"];
                    let table = '<table>' +
                        String(
                            fields.map(
                                (v, i) =>
                                    `<tr>


            <td>${handleObject(layer.feature.properties[v])}</td>
            <th>${aliases[i]}</th>
        </tr>`).join(''))
                        + '</table>';
                    div.innerHTML = table;

                    return div
                }
                , {"className": "foliumtooltip", "sticky": true});
        }
    });
    }

        });

new L.Control.Zoom({ position: 'topright' }).addTo(map);
var locate_control_e5f44ad5fae447d4ab47540d30978b01 = L.control.locate(
    {position:"topright"}
).addTo(map);


//1) Definir Las Variables Correspondintes
//1 precipitacion
var opt_1 = new Array ("", "POWERNASA","SMN" );
//2 temp med, temp max temp min
var opt_2 = new Array ("", "POWERNASA", "SMN", "CHIRPS", "ERA5");
//3 radiacion
var opt_3 = new Array ("", "POWERNASA", "SMN","ERA5");
//4 solo mensual
var opt_4 = new Array ("", "SMN");
//4 tension de vapor y dpv
var opt_5 = new Array ("", "SMN");
// 2) crear una funcion que permita ejecutar el cambio dinamico
var options_1 = new Array ("","Media anual","------------------", "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var options_2 = new Array ("","Media anual","------------------", "Semestre Frío", "Semestre Cálido","------------------","Verano","Otoño","Invierno","Primavera","------------------","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var options_3 = new Array ("","Media anual","------------------","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var options_4 = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

function cambia() {
    var cosa;
    //Se toma el vamor de la "cosa seleccionada"
    cosa = document.formulario1.cosa[document.formulario1.cosa.selectedIndex].value;
    //se chequea si la "cosa" esta definida
    if (cosa != 0) {
        //selecionamos las cosas Correctas
        mis_opts = eval("opt_" + cosa);
        mis_options = eval("options_" + cosa);
        //se calcula el numero de cosas
        num_opts = mis_opts.length;
        num_options = mis_options.length;
        //marco el numero de opt en el select
        document.formulario1.opt.length = num_opts;
        document.formulario1.options.length = num_options;
        //para cada opt del array, la pongo en el select
        for (i = 0; i < num_opts; i++) {
            document.formulario1.opt.options[i].value = mis_opts[i];
            document.formulario1.opt.options[i].text = mis_opts[i];
        }
        for (i = 0; i < num_options; i++) {
            document.formulario1.options.options[i].value = mis_options[i];
            document.formulario1.options.options[i].text = mis_options[i];
        }
    } else {
        //si no habia ninguna opt seleccionada, elimino las cosas del select
        document.formulario1.opt.length = 1;
        //ponemos un guion en la unica opt que he dejado
        document.formulario1.opt.options[0].value = "-";
        document.formulario1.opt.options[0].text = "-";
        //si no habia ninguna opt seleccionada, elimino las cosas del select
        document.formulario1.options.length = 1;
        //ponemos un guion en la unica opt que he dejado
        document.formulario1.options.options[0].value = "-";
        document.formulario1.options.options[0].text = "-";
    }

    //hacer un reset de las opts
    document.formulario1.opt.options[0].selected = true;
    document.formulario1.options.options[0].selected = true;
}




var control_capas=    L.control.layers(baseMaps, overlayMaps,{
    position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: false // true
}).addTo(map);

