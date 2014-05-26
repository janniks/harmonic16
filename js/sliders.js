$(function() {
	$("#hue").slider({
		orientation: "horizontal",
		range: "min",
		max: 360,
		value: 30,
		slide: refresh,
		change: refresh
	});
	//$("#hue").slider("value", 30);
});
$(function() {
	$("#fun").slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 65,
		slide: refresh,
		change: refresh
	});
});
$(function() {
	$("#sat").slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 55,
		slide: refresh,
		change: refresh
	});
});
$(function() {
	$("#val").slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 75,
		slide: refresh,
		change: refresh
	});
});
$(function() {
	$("#ind").slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 90,
		slide: refresh,
		change: refresh
	});
});
$( document ).ready(function() {
	refresh();
});