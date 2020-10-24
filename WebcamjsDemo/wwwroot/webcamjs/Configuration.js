function ready() {
	if (document.readyState == 'complete') {
		Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		try {
			Webcam.attach('#camera');
		} catch (e) {
			alert(e);
		}
	}
}

function take_snapshot() {
	// take snapshot and get image data
	var data = null;
	Webcam.snap(function (data_uri) {

		data = data_uri;
	});
	return data;
}
