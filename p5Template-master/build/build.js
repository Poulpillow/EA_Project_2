var z = [];
var dance;
var truncation = 1;
var count = 0;
var z_indices = [[5, 8], [81, 68], [3, 9], [200, 468], [479, 444], [63, 240], [311, 75], [367, 456], [400, 266], [159, 413], [195, 481], [340, 179], [25, 26]];
var gui = new dat.GUI();
var params = {
    MaxFrame: 975,
    Download_Image: function () { return save(); },
};
gui.add(params, "MaxFrame", 10, 1000, 1);
gui.add(params, "Download_Image");
var modele = new rw.HostedModel({});
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
    var theta = map(count, 0, params.MaxFrame - 1, 0, TWO_PI * z_indices.length);
    var index = floor(map(count, 0, params.MaxFrame - 1, 0, z_indices.length));
    z[z_indices[index][0]] = cos(theta + TWO_PI / 8);
    z[z_indices[index][1]] = sin(theta + TWO_PI / 8);
    if (index > 0) {
        z[z_indices[index - 1][0]] = 1 / sqrt(2);
        z[z_indices[index - 1][1]] = 1 / sqrt(2);
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
    for (var i = 0; i < z_indices.length; ++i) {
        z[z_indices[i][0]] = 1 / sqrt(2);
        z[z_indices[i][1]] = 1 / sqrt(2);
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