// -------------------
//  Parameters and UI
// -------------------

const z = [];
let dance;
let truncation=1;
let count=0;
const z_indices = [[5, 8], [81, 68], [3, 9], [200, 468],[479,444],[63,240],[311,75],[367,456],[400,266],[159,413],[195,481],[340,179],[25,26]]

const gui = new dat.GUI()
const params = {
    MaxFrame: 975,
    Download_Image: () => save(),
}
gui.add(params, "MaxFrame",10,1000,1)
gui.add(params, "Download_Image")

//@ts-ignore
const modele = new rw.HostedModel({
    // EMAIL clemvoegele@gmail.com : used
    // url: "https://fashion-illustrations-d515a0ce.hosted-models.runwayml.cloud/v1/",
    // token: "clAH7CRoH1FdrNmmZUY1DA==",

    // EMAIL clemence.voegele@gmail.com : used
    // url: "https://fashion-illustrations-c90f7f2f.hosted-models.runwayml.cloud/v1/",
    // token: "djqRhBB66SmA+ih0Cu7VFw==",

    // EMAIL Julia052000@hotmail.fr : used
    // url: "https://fashion-illustrations-ce03057f.hosted-models.runwayml.cloud/v1/",
    // token: "BfGfLZ+S0EZnPmo+SSbbzg==",

    // EMAIL jujuclemimac@gmail.com : used
    // url: "https://fashion-illustrations-87956c47.hosted-models.runwayml.cloud/v1/",
    // token: "AFv/U9ziH45utMQmagpKuQ==",

    // EMAIL julencefougele@gmail.com : used
    // url: "https://fashion-illustrations-d94c60f1.hosted-models.runwayml.cloud/v1/",
    // token: "8afun+/O0z5p/JuFPHn2vQ==",
  });


// -------------------
//       Drawing
// -------------------

function draw() 
{
    background(0)
    if (dance) 
    {
      image(dance, 0, 0,width,height);
    }
}

function generateDance() 
{
    const data = {
      z: z,
      truncation: truncation
    };

    modele.info().then(info => console.log(info));

    modele.query(data).then(gotImage);
}

function gotError(error) 
{
    console.error(error);
}

function gotImage(result) {
  dance = createImg(result.image);
  // Download every generated picture
  p5.prototype.downloadFile(result.image, count.toString(), "png")
  dance.hide();

  // Creation of the gif loop
  const theta = map(count, 0, params.MaxFrame - 1, 0, TWO_PI * z_indices.length);

  // Creation of the rythm

  const index = floor(map(count, 0, params.MaxFrame - 1, 0, z_indices.length))

  z[z_indices[index][0]] = cos(theta + TWO_PI / 8);
  z[z_indices[index][1]] = sin(theta + TWO_PI / 8);
  if (index > 0) {
    z[z_indices[index-1][0]] = 1/sqrt(2)
    z[z_indices[index-1][1]] = 1/sqrt(2)
  }

  // Variable to stop the code
  count ++;
  if (count<params.MaxFrame) {
    generateDance();
  }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    for (let i = 0; i < 512; i++) {
        z[i] = 0   
    }
 
    for (let i = 0; i < z_indices.length; ++i) {
      z[z_indices[i][0]] = 1/sqrt(2)
      z[z_indices[i][1]] = 1/sqrt(2)
    }   
    createButton('dance').mousePressed(() => {count = 0; generateDance()});
}

function windowResized() {
    p6_ResizeCanvas()
}
