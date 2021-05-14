var z = [];
var dance;
var truncation;
var count = 0;
var t;
var gui = new dat.GUI();
var params = {
    MaxFrame: 10,
    Download_Image: function () { return save(); },
};
gui.add(params, "MaxFrame", 10, 100, 10);
gui.add(params, "Download_Image");
var modele = new rw.HostedModel({
    url: "https://fashion-illustrations-c90f7f2f.hosted-models.runwayml.cloud/v1/",
    token: "djqRhBB66SmA+ih0Cu7VFw==",
});
function draw() {
    background(0);
    if (dance) {
        image(dance, 0, 0, width, height);
    }
}
function generateDance() {
    var data = {
        z: z,
        truncation: truncation
    };
    modele.info().then(function (info) { return console.log(info); });
    modele.query(data).then(gotImage);
}
function gotError(error) {
    console.error(error);
}
function gotImage(result) {
    dance = createImg(result.image);
    p5.prototype.downloadFile(result.image, count.toString(), "png");
    dance.hide();
    var theta = map(count, 0, params.MaxFrame - 1, 0, TWO_PI);
    z[5] = cos(theta);
    z[13] = sin(theta);
    t = map(count, 0, params.MaxFrame, 0, 30);
    if (t < 15) {
        truncation = map(t, 0, 15, 0.2, 0.7);
    }
    else if (t < 20) {
        truncation = map(t, 15, 20, 0.7, 0.3);
    }
    else {
        truncation = map(t, 20, 30, 0.3, 0.5);
    }
    count++;
    if (count < params.MaxFrame) {
        generateDance();
    }
}
function setup() {
    p6_CreateCanvas();
    for (var i = 0; i < 512; i++) {
        z[i] = 0;
    }
    createButton('dance').mousePressed(function () { count = 0; generateDance(); });
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map