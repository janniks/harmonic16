function updateLabel(name) {
	setSlider(name, $("#" + name + "_label").val());
	refresh();
}

function updateLabels() {
	var sliders = new Array("hue", "fun", "sat", "val");
	for  (var i = 0; i < sliders.length; i++) {
		//update labels from sliders
		setLabel(sliders[i], getSlider(sliders[i]));
	}
}

function refresh() {
	//update
	updateLabels();

	//get vars
	var hue = getSlider("hue");
	var sat = getSlider("sat");
	var val = getSlider("val");

	//make base color
	var base = pusher.color('hsv', hue, sat, val);

	//label arrays
	var idBases =     new Array("base00", "base01", "base02", "base03", "base04", "base05", "base06", "base07");
	var idColors =    new Array("base08", "base09", "base0A", "base0B", "base0C", "base0D", "base0E", "base0F");
	//offsets
	var symmetrical = new Array(0, 30, 60, 120, 180, 240, 300, 330);
	//var reversed =    new Array(0, 30, 60, 120, 180, 210, 240, 300);

	//GENERATE COLORS
	var colors = generateColors(idColors.length, symmetrical, base);
	//var colors = generateColors(idColors.length, reversed, base);

	//GENERATE BASES
	var bases;
	if ($("#comp").prop("checked"))
		bases = generateBases(base.complement().hue());
	else
		bases = generateBases(base.hue());

	//OUTPUT
	output(colors, idColors, bases, idBases);
}

function output(colors, idColors, bases, idBases) {
	for (var i = 0; i < colors.length; i++) {
		$("#"+idColors[i]).css("background-color", colors[i]);
		$("#"+idBases[i]).css("background-color", bases[i]);
	}
}

function generateColors(l, offset, baseColor) {
	//save base hue
	var baseHue = baseColor.hue();

	//array to save colors
	var colors = new Array();

	//generate colors
	for (var i = 0; i < l; i++) {
		//adjust hue
		var newHue = baseHue;
		newHue += offset[i];
		//keep hue under 360 (optional)
		if (newHue > 360)
			newHue -= 360;
		//add to array
		colors.push(baseColor.hue(newHue).hex6());
	}

	//return array
	return colors;
}

function generateBases(baseHue) {
	//get vars
	var fun = 0.5 + (getSlider("fun")) / 100;
	var relSat = (getSlider("sat")) / 100;
	
	//fixed count
	var count = 10;
	//step from count
	var step = 1 / count;

	//array to save bases
	var bases = new Array();

	for (var i = 1, j = 0; i < count && j < 8; i++) {
		//bigger step in middle (leave out 5)
		if (i != 5) {
			//calculate saturation
			var sat = Math.pow(i * step, fun) * 100;
			
			var hue = baseHue;
			if (i < 5 && $("#switch").prop("checked")) {
				hue += 180;
			}

			//keep hue under 360 (optional)
			if (hue > 360)
				hue -= 360;
			var toneColor = pusher.color('hsv', hue, sat * relSat, 100 - sat);
			bases.push(toneColor.hex6());
			j++;
		}
	}

	//return array
	return bases;
}

function getSlider(name) {
	return $("#" + name).slider("option", "value").toString();
}

function setSlider(name, val) {
	$("#" + name).slider("value", val);
}

function setLabel(name, val) {
	$("#" + name + "_label").val(val);
}

//generate file


// (function () {
// var textFile = null,
//   makeTextFile = function (text) {
//     var data = new Blob([text], {type: 'text/plain'});

//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//       window.URL.revokeObjectURL(textFile);
//     }

//     textFile = window.URL.createObjectURL(data);

//     return textFile;
//   };


//   var create = document.getElementById('create'),
//     textbox = document.getElementById('textbox');

//   create.addEventListener('click', function () {
//     var link = document.getElementById('downloadlink');
//     link.href = makeTextFile(textbox.value);
//     link.style.display = 'block';
//   }, false);
// })();



