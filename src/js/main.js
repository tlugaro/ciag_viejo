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
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});



var map = L.map('content', { zoomControl:false, minZoom: 4, zoomSnap: 0.25 }).setView([-38.86, -64.33], 4.5);

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
    return d > 30.0? '#7f2704' :
        d > 28.0 ? '#993103' :
            d > 26 ? '#b43b02' :
                d > 24.0 ? '#d14501' :
                    d > 22.0  ? '#e25407' :
                        d > 20.0  ? '#ee6510' :
                            d > 18.0  ? '#f67722' :
                                d > 16.0  ? '#fc8938' :
                                    d > 14.0  ? '#fd9b4f' :
                                        d > 12.0  ? '#fdac67' :
                                            d > 10.0  ? '#fdbd83' :
                                                d > 8.0  ? '#fdcf9f' :
                                                    d > 6.0  ? '#fedbb7' :
                                                        d > 4.0  ? '#fee6cd' :
                                                            d > 2.0  ? '#ffeedc' :
                                                                d > 0.0  ? '#fff5eb' :
                                                                    '#fff5eb';

}

function style3(feature3) {
    return {
        weight: 1.5,
        opacity: 0.8,
        color: getColor3(feature3.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
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
        weight: 1.5,
        opacity: 0.8,
        color: getColorep(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorep(feature2.properties.DN)
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
        weight: 1.5,
        opacity: 0.8,
        color: getColorepmen(feature2.properties.DN),
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: getColorepmen(feature2.properties.DN)
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
                                                                                        '#A55809';

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
//Temperatura

function getColor1(d) {
    return d > 40.0 ? '#8d0017' :
        d > 39.0 ? '#950018' :
            d > 38.0 ? '#9c0019' :
                d > 37.0 ? '#a4001a' :
                    d > 36.0 ? '#ab001b' :
                        d > 35.0 ? '#b3001c' :
                            d > 34.0 ? '#ba001d' :
                                d > 33.0 ? '#c2001e' :
                                    d > 32.0 ? '#ca0020' :
                                        d > 31.0 ? '#cd0721' :
                                            d > 30.0 ? '#cf0f22' :
                                                d > 29.0 ? '#d11723' :
                                                    d > 28.0 ? '#d41f24' :
                                                        d > 27.0 ? '#d62725' :
                                                            d > 26.0 ? '#d92f26' :
                                                                d > 25.0 ? '#db3727' :
                                                                    d > 24.0 ? '#de3f28' :
                                                                        d > 23.0 ? '#e04729' :
                                                                            d > 22.0 ? '#e34f2a' :
                                                                                d > 21.0 ? '#e5562b' :
                                                                                    d > 20.0 ? '#e75d2c' :
                                                                                        d > 19.0 ? '#e9642d' :
                                                                                            d > 18.0 ? '#eb6c2e' :
                                                                                                d > 17.0 ? '#ee732f' :
                                                                                                    d > 16.0 ? '#f07a30' :
                                                                                                        d > 15.0 ? '#f28131' :
                                                                                                            d > 14.0 ? '#f48832' :
                                                                                                                d > 13.0 ? '#f68f33' :
                                                                                                                    d > 12.0 ? '#f89634' :
                                                                                                                        d > 11.0 ? '#f89b37' :
                                                                                                                            d > 10.0 ? '#f79f3b' :
                                                                                                                                d > 9.0 ? '#f7a43e' :
                                                                                                                                    d > 8.0 ? '#f6a841' :
                                                                                                                                        d > 7.0 ? '#f5ad45' :
                                                                                                                                            d > 6.0 ? '#f5b148' :
                                                                                                                                                d > 5.0 ? '#f4b64c' :
                                                                                                                                                    d > 4.0 ? '#f4bb53' :
                                                                                                                                                        d > 3.0 ? '#f7cc7e' :
                                                                                                                                                            d > 2.0 ? '#fadea9' :
                                                                                                                                                                d > 1.0 ? '#fdefd5' :
                                                                                                                                                                    d > 0.0 ? '#ffffff' :
                                                                                                                                                                        d > -1.0 ? '#dbebf4' :
                                                                                                                                                                            d > -2.0 ? '#b8d7e9' :
                                                                                                                                                                                d > -3.0 ? '#94c2de' :
                                                                                                                                                                                    d > -4.0 ? '#70aed2' :
                                                                                                                                                                                        d > -5.0 ? '#4d9ac7' :
                                                                                                                                                                                            d > -6.0 ? '#2986bc' :
                                                                                                                                                                                                d > -7.0 ? '#0571b0' :
                                                                                                                                                                                                    d > -8.0 ? '#046eab' :
                                                                                                                                                                                                        d > -9.0 ? '#046ba6' :
                                                                                                                                                                                                            d > -10.0 ? '#0468a2' :
                                                                                                                                                                                                                d > -11.0 ? '#04659d' :
                                                                                                                                                                                                                    d > -12.0 ? '#046198' :
                                                                                                                                                                                                                        d > -13.0 ? '#045e93' :
                                                                                                                                                                                                                            d > -14.0 ? '#035b8e' :
                                                                                                                                                                                                                                d > -15.0 ? '#035889' :
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
    layerGroup.clearLayers();
    map.removeControl(legend);

    // 1 es powernasa, 2 es SMN, 3 es IGN
    // 1 es anual,2 es semtral, 3 es estacion, 4 es trimestral, 5 es mensual
    var base = ($("#bd").val()) +"_"+ ($("#var").val()) +"_"+($("#variable").val()) +"_"+($("#tp").val());
    var base2 = ($("#bd option:selected").text()) +"_"+ ($("#var option:selected").text()) +"_"+($("#tp option:selected").text());


    if (($("#var option:selected").text())=="Temperatura Media" ||($("#var option:selected").text())=="Temperatura Máxima" || ($("#var option:selected").text())=="Temperatura Mínima"){
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
                        grades = [-15,-10,-5,0,5,10,15,20,25,30,35,40],
                        labels = ['<strong></strong>']
                    title= ["Temperatura"];

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
                    grades = [0,40,80,100,120,160,200,240],
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


            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0,4,8,12,16,20,24,28,32],
                    labels = ['<strong></strong>']
                title= ["mm"];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor3(grades[i]) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? ' W/m2' + '<br>' : ' W/m2 +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
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
                    let aliases = ["hpa"];
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
                        grades[i] + (grades[i + 1] ? ' hpa' + '<br>' : ' hpa +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
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
                    let aliases = ["hpa"];
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
                        grades[i] + (grades[i + 1] ? ' hpa' + '<br>' : ' hpa +');
                }

                return div;
            };

            legend.addTo(map);
            prov.bringToFront();
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
var opt_1 = new Array ("", "POWERNASA","SMN", );
//2 temp med, temp max temp min
var opt_2 = new Array ("", "POWERNASA", "SMN", "CHIRPS", "ERA5");
//3 radiacion
var opt_3 = new Array ("", "Variables astronómicas");
//4 humedad
var opt_4 = new Array ("", "POWERNASA", "SMN");
//4 tension de vapor y dpv
var opt_5 = new Array ("", "SMN");
// 2) crear una funcion que permita ejecutar el cambio dinamico
var options_1 = new Array ("","Media anual","------------------", "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var options_2 = new Array ("","Media anual","------------------", "Semestre Frío", "Semestre Cálido","------------------","Verano","Otoño","Invierno","Primavera","------------------","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var options_3 = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

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

