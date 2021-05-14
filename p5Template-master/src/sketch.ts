// -------------------
//  Parameters and UI
// -------------------

const z = [];
let dance;
let truncation;
let count=0;
let t;

const gui = new dat.GUI()
const params = {
    MaxFrame: 10,
    Download_Image: () => save(),
}
gui.add(params, "MaxFrame",10,100,10)
gui.add(params, "Download_Image")

//@ts-ignore
const modele = new rw.HostedModel({
    // EMAIL clemvoegele@gmail.com : used
    // url: "https://fashion-illustrations-d515a0ce.hosted-models.runwayml.cloud/v1/",
    // token: "clAH7CRoH1FdrNmmZUY1DA==",

    // EMAIL clemence.voegele@gmail.com
    url: "https://fashion-illustrations-c90f7f2f.hosted-models.runwayml.cloud/v1/",
    token: "djqRhBB66SmA+ih0Cu7VFw==",
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

/*TEST1
  function gotImage(result) {
      dance = createImg(result.image);
      dance.hide();
      for (let i = 0; i < 512; i++)
      {
        z[i]+=0.1;
        if (z[i]>0.5)
        {
          z[i]=-0.5;
        }
      }
      if (count<10) {
        setTimeout(generateDance,1000);
        count ++;
      }
  }
*/

/*TEST2
  function gotImage(result) {
    dance = createImg(result.image);
    p5.prototype.downloadFile(result.image, count.toString(), "png")
    dance.hide();
    truncation+=0.1;
    if (count<10) {
      setTimeout(generateDance,1000);
      count ++;
    }
  }
*/

/*TEST3
  function gotImage(result) {
    dance = createImg(result.image);
    p5.prototype.downloadFile(result.image, count.toString(), "png")
    dance.hide();
    const theta=map(count,0,params.MaxFrame-1,0,TWO_PI);

    // EQUATION 1 (cercle spirale)
    // z[i]=cos(theta)+0.1*cos(10*theta);
    // z[j]=sin(theta)+0.1*sin(10*theta);


    // EQUATION 2 (coeur)
    // z[i]=16 * pow(sin(theta), 3.0);
    // z[j]=13 * cos(theta) - 5 * cos(2*theta) - 2 * cos(3*theta) - cos(4*theta);
    

    // Z utilisé : 0,1,3,5,8,10,21,100,490,491,500,501,510,511

    // EQUATION 3 (cercle)
    z[5]=cos(theta);
    z[13]=sin(theta);

    truncation=map(count,0,params.MaxFrame-1,0.5,1);

    count ++;
    if (count<params.MaxFrame) {
      //setTimeout(generateDance,1000);
      generateDance();
    }
  }
*/

function gotImage(result) {
  dance = createImg(result.image);
  // Download every generated picture
  p5.prototype.downloadFile(result.image, count.toString(), "png")
  dance.hide();

  // Creation of the gif loop
  const theta=map(count,0,params.MaxFrame-1,0,TWO_PI);
  z[5]=cos(theta);
  z[13]=sin(theta);

  // Creation of the rythm
  t=map(count,0,params.MaxFrame,0,30)

  if (t<15) {
    truncation=map(t,0,15,0.2,0.7);
  }

  else if (t<20) {
    truncation=map(t,15,20,0.7,0.3);
  }

  else {
    truncation=map(t,20,30,0.3,0.5);
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
        z[i] = 0; //last version : =random(-0.1, 0.1);
    }
    createButton('dance').mousePressed(() => {count = 0; generateDance()});
}

function windowResized() {
    p6_ResizeCanvas()
}
