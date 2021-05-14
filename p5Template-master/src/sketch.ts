// -------------------
//  Parameters and UI
// -------------------

let dance;

const z = [];

let truncation=0;

let count=0;

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")
//@ts-ignore
const modele = new rw.HostedModel({
    // url: "https://fashion-illustrations-d515a0ce.hosted-models.runwayml.cloud/v1/",
    // token: "clAH7CRoH1FdrNmmZUY1DA==",

    url: "https://fashion-illustrations-c90f7f2f.hosted-models.runwayml.cloud/v1/",
    token: "djqRhBB66SmA+ih0Cu7VFw==",
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
      truncation: truncation
    };

    //// You can use the info() method to see what type of input object the model expects
    modele.info().then(info => console.log(info));

    modele.query(data).then(gotImage);
  }

function gotError(error) {
    console.error(error);
}
  
// function gotImage(result) {
//     dance = createImg(result.image);
//     dance.hide();
//     for (let i = 0; i < 512; i++)
//     {
//       z[i]+=0.1;
//       if (z[i]>0.5)
//       {
//         z[i]=-0.5;
//       }
//     }
//     if (count<10) {
//       setTimeout(generateDance,1000);
//       count ++;
//     }
// }

// function gotImage(result) {
//   dance = createImg(result.image);
//   p5.prototype.downloadFile(result.image, count.toString(), "png")
//   dance.hide();
//   truncation+=0.1;
//   if (count<10) {
//     setTimeout(generateDance,1000);
//     count ++;
//   }
// }

function gotImage(result) {
  dance = createImg(result.image);
  p5.prototype.downloadFile(result.image, count.toString(), "png")
  dance.hide();
  const theta=map(count,0,9,0,TWO_PI);
  // z[21]=cos(theta)+0.1*cos(10*theta);
  // z[8]=sin(theta)+0.1*sin(10*theta);

  // z[5]=16 * pow(sin(theta), 3.0);
  // z[3]=13 * cos(theta) - 5 * cos(2*theta) - 2 * cos(3*theta) - cos(4*theta);

  z[490]=cos(theta);
  z[491]=sin(theta);

  count ++;
  if (count<10) {
    //setTimeout(generateDance,1000);
    generateDance();
  }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    for (let i = 0; i < 512; i++) {
        z[i] = random(-0.1, 0.1);
    }
    createButton('dance').mousePressed(() => {count = 0; generateDance()});
}

function windowResized() {
    p6_ResizeCanvas()
}

//modifier z et l'equation de la boucle

//Intégrer l'ia sur les papillons
// mettre en mvt