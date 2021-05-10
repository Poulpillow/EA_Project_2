// -------------------
//  Parameters and UI
// -------------------

let dance;

const z = [];

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")
//@ts-ignore
const modele = new rw.HostedModel({
    url: "https://fashion-illustrations-d515a0ce.hosted-models.runwayml.cloud/v1/",
    token: "clAH7CRoH1FdrNmmZUY1DA==",
  });
  

// -------------------
//       Drawing
// -------------------

function draw() {
    background(0)
    if (dance) 
    {
        image(dance, 0, 0,width,height);
    }
}

function generateDance() {
    // httpPost(path, [datatype], [data], [callback], [errorCallback])

    const data = {
      z: z,
      truncation: 0.8
    };

    //// You can use the info() method to see what type of input object the model expects
    modele.info().then(info => console.log(info));

    modele.query(data).then(gotImage);
  }

  function gotError(error) {
    console.error(error);
  }
  
  function gotImage(result) {
    dance = createImg(result.image);
    dance.hide();
    z[0]+=0.1;
    generateDance();
  }

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    for (let i = 0; i < 512; i++) {
        z[i] = random(-0.1, 0.1);
    }
    createButton('dance').mousePressed(generateDance);
}

function windowResized() {
    p6_ResizeCanvas()
}