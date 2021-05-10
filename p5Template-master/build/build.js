var dance;
var z = [];
var truncation = 0;
var count = 0;
var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
};
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
    var theta = map(count, 0, 99, 0, TWO_PI);
    z[5] = 16 * pow(sin(theta), 3.0);
    z[3] = 13 * cos(theta) - 5 * cos(2 * theta) - 2 * cos(3 * theta) - cos(4 * theta);
    count++;
    if (count < 100) {
        generateDance();
    }
}
function setup() {
    p6_CreateCanvas();
    for (var i = 0; i < 512; i++) {
        z[i] = random(-0.1, 0.1);
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