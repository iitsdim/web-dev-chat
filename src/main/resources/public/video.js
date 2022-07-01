const front = false;
const video = document.getElementById('video');
const constraints = { video: { facingMode: (front? "user" : "environment"), width: 640, height: 480  } };
navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); })
