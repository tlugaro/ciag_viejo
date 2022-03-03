
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



var map = L.map('content', { zoomControl:false, minZoom: 4 }).setView([-38.86, -72.35], 4);

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
                    weight: 1,
                    opacity: 1,
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
                    weight: 1,
                    opacity: 1,
                    color: getColor3(feature3.properties.DN),
                    dashArray: '1',
                    fillOpacity: 0.8,
                    fillColor: getColor3(feature3.properties.DN)
                };
            }
            //Precipitacion
        function getColor2(d) {
                return d > 2200.0? '#08314C' :
                        d > 2100.0 ? '#093756' :
                            d > 2000 ? '#0D4266' :
                        d > 1900.0 ? '#0D4B75' :
                        d > 1800.0  ? '#0D5483' :
                        d > 1700.0  ? '#155F90' :
                        d > 1600.0  ? '#1B689C' :
                        d > 1500.0  ? '#2071A7' :
                        d > 1400.0  ? '#2276AF' :
                        d > 1300.0  ? '#3079AB' :
                        d > 1200.0  ? '#4084B2' :
                        d > 900.0  ? '#649EC6' :
                        d > 800.0  ? '#7AAACD' :
                        d > 700.0  ? '#A5C9E3' :
                        d > 600.0  ? '#CAE7FC' :
                        d > 500.0  ? '#FFEC9D' :
                        d > 400.0  ? '#D7AB68' :
                        d > 300.0  ? '#B98959' :
                        d > 200.0  ? '#AF6E2E' :
                        d > 100.0  ? '#A55809' :
                         '#814609';

            }

            function style2(feature2) {
                return {
                    weight: 1,
                    opacity: 1,
                    color: getColor2(feature2.properties.DN),
                    dashArray: '1',
                    fillOpacity: 0.8,
                    fillColor: getColor2(feature2.properties.DN)
                };
            }
            //Temperatura
            function getColor1(d) {
                return d > 30.0 ? '#ca0020' :
                        d > 29.0 ? '#cd0921' :
                            d > 28.0 ? '#d01322' :
                        d > 27.0 ? '#d31d24' :
                        d > 26.0  ? '#d62725' :
                        d > 25.0  ? '#d93126' :
                        d > 24.0  ? '#dc3a28' :
                        d > 23.0  ? '#df4429' :
                        d > 22.0  ? '#e24e2a' :
                        d > 21.0  ? '#e5582c' :
                        d > 20.0  ? '#e8622d' :
                        d > 19.0  ? '#eb6b2e' :
                        d > 18.0  ? '#ee7530' :
                        d > 17.0  ? '#f17f31' :
                        d > 16.0  ? '#f48932' :
                        d > 15.0  ? '#f79334' :
                        d > 14.0  ? '#f89a3c' :
                        d > 13.0  ? '#f8a149' :
                        d > 12.0  ? '#f8a756' :
                        d > 11.0  ? '#f8ad62' :
                        d > 10.0  ? '#f8b46f' :
                        d > 9.0  ? '#f8ba7c' :
                        d > 8.0  ? '#f8c088' :
                        d > 7.0  ? '#f8c795' :
                        d > 6.0  ? '#f8cda2' :
                        d > 5.0  ? '#f8d3ae' :
                            d > 4.0  ? '#f8d9bb' :
                        d > 3.0  ? '#f8e0c8' :
                        d > 2.0  ? '#f8e6d5' :
                        d > 1.0  ? '#f8ece1' :
                        d > 0  ? '#f8f3ee' :
                        d > -1.0  ? '#ffffff' :
                        d > -2.0  ? '#e1eef6' :
                        d > -3.0  ? '#c8e0ee' :
                        d > -4.0  ? '#b0d2e6' :
                        d > -5  ? '#97c4df' :
                        d > -6.0  ? '#4e9bc7' :
                        d > -7.0  ? '#358dc0' :
                        d > -8.0  ? '#1d7fb8' :
                                    '#0571b0';
            }

            function style1(feature1) {
                return {
                    weight: 1,
                    opacity: 1,
                    color: getColor1(feature1.properties.DN),
                    dashArray: '1',
                    fillOpacity: 0.8,
                    fillColor: getColor1(feature1.properties.DN)
                };
            }
            function styleprov() {
                return {
                    weight: 1,
                    opacity: 1,
                    color: 	"#ffffff",
                    dashArray: '1',
                    fillOpacity: 0,
                    fillColor: 	"#00FF00"
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
    var elemento3 = document.getElementById("variable").value
    if (elemento3 == "") {
        alert("Elije una escala temporal!")
        return false
    }
    var elemento4 = document.getElementById("tp").value
    if (elemento4 == "") {
        alert("Elije un período de tiempo!")
        return false
    }
    var based = ($("#bd option:selected").text()) +"_"+ ($("#var option:selected").text()) +"_"+($("#variable option:selected").val()) +"_"+($("#tp option:selected").text());
    const down  = document.createElement('a');
    down.href= "{{ url_for('static',filename='/capas/')}}" + based +".geojson";
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
    var elemento3 = document.getElementById("variable").value
    if (elemento3 == "") {
        alert("Elije una escala temporal!")
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
    var base2 = ($("#bd option:selected").text()) +"_"+ ($("#var option:selected").text()) +"_"+($("#variable option:selected").val()) +"_"+($("#tp option:selected").text());


    if (($("#var option:selected").text())=="Temperatura Media" ||($("#var option:selected").text())=="Temperatura Máxima" || ($("#var option:selected").text())=="Temperatura Mínima"){
    $.ajax({

        url: "{{ url_for('static',filename='/capas/')}}" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson(jQuery.parseJSON(data), {
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
        grades = [-5,0,5,10,15,20,25,30],
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
    else if (($("#var option:selected").text())=="Precipitación"){$.ajax({

        url: "{{ url_for('static',filename='/capas/')}}" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson(jQuery.parseJSON(data), {
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
        grades = [0,300,600,900,1200,1500,1800,2100],
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
else if (($("#var option:selected").text())=="Radiación"){$.ajax({

        url: "{{ url_for('static',filename='/capas/')}}" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson(jQuery.parseJSON(data), {
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
else if (($("#var option:selected").text())=="Humedad"){$.ajax({

        url: "{{ url_for('static',filename='/capas/')}}" + base2 +".geojson",

        success: function (data) {

            var geojson = new L.geoJson(jQuery.parseJSON(data), {
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
});

new L.Control.Zoom({ position: 'topright' }).addTo(map);
var locate_control_e5f44ad5fae447d4ab47540d30978b01 = L.control.locate(
                {position:"topright"}
            ).addTo(map);


			//1) Definir Las Variables Correspondintes
        //1 precipitacion
			var opt_1 = new Array ("", "POWERNASA","SMN","INTA");
        //2 temp med, temp max temp min
            var opt_2 = new Array ("", "POWERNASA", "SMN");
        //3 radiacion
			var opt_3 = new Array ("", "POWERNASA", "SMN");
        //4 humedad
			var opt_4 = new Array ("", "POWERNASA", "SMN");
			// 2) crear una funcion que permita ejecutar el cambio dinamico

			function cambia(){
				var cosa;
				//Se toma el vamor de la "cosa seleccionada"
				cosa = document.formulario1.cosa[document.formulario1.cosa.selectedIndex].value;
				//se chequea si la "cosa" esta definida
				if(cosa!=0){
					//selecionamos las cosas Correctas
					mis_opts=eval("opt_" + cosa);
					//se calcula el numero de cosas
					num_opts=mis_opts.length;
					//marco el numero de opt en el select
					document.formulario1.opt.length = num_opts;
					//para cada opt del array, la pongo en el select
					for(i=0; i<num_opts; i++){
						document.formulario1.opt.options[i].value=mis_opts[i];
						document.formulario1.opt.options[i].text=mis_opts[i];
					}
					}else{
						//si no habia ninguna opt seleccionada, elimino las cosas del select
						document.formulario1.opt.length = 1;
						//ponemos un guion en la unica opt que he dejado
						document.formulario1.opt.options[0].value="-";
						document.formulario1.opt.options[0].text="-";
					}
					//hacer un reset de las opts
					document.formulario1.opt.options[0].selected = true;

				}
				//1) Definir Las Variables Correspondintes
			var options_1 = new Array ("", "Media Anual");
			var options_2 = new Array ("", "Frío", "Cálido");
			var options_3 = new Array ("", "Enero-Marzo","Marzo-Mayo","Junio-Agosto","Septiembre-Diciembre");
			var options_5 = new Array ("", "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
			// 2) crear una funcion que permita ejecutar el cambio dinamico

			function cambio(){
				var periodo;
				//Se toma el vamor de la "cosa seleccionada"
				periodo = document.formulario1.periodo[document.formulario1.periodo.selectedIndex].value;
				//se chequea si la "cosa" esta definida
				if(periodo!=0){
					//selecionamos las cosas Correctas
					mis_options=eval("options_" + periodo);
					//se calcula el numero de cosas
					num_options=mis_options.length;
					//marco el numero de opt en el select
					document.formulario1.options.length = num_options;
					//para cada opt del array, la pongo en el select
					for(i=0; i<num_options; i++){
						document.formulario1.options.options[i].value=mis_options[i];
						document.formulario1.options.options[i].text=mis_options[i];
					}
					}else{
						//si no habia ninguna opt seleccionada, elimino las cosas del select
						document.formulario1.options.length = 1;
						//ponemos un guion en la unica opt que he dejado
						document.formulario1.options.options[0].value="-";
						document.formulario1.options.options[0].text="-";
					}
					//hacer un reset de las opts
					document.formulario1.options.options[0].selected = true;

				}

var control_capas=    L.control.layers(baseMaps, overlayMaps,{
	position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
	collapsed: false // true
}).addTo(map);
