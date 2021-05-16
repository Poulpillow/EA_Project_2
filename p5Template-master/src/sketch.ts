// -------------------
//  Parameters and UI
// -------------------

let dance
let truncation=1
let count=0

// Parmeters of the AI (each couple are two parameters that will change in each loop of the two dimensional circle)
const z = []
const z_index = [
  [5, 8], 
  [81, 68], 
  [3, 9], 
  [200, 468], 
  [479,444],
  [63,240],
  [311,75],
  [367,456],
  [400,266],
  [159,413],
  [195,481],
  [340,179],
  [25,26]
]

const gui = new dat.GUI()
const params = {
  MaxFrame: 100,
  Download_Image: () => save(),
}
gui.add(params, "MaxFrame",100,1000,10)
gui.add(params, "Download_Image")

// Here lies every account we used on runwayml.com to test our AI
// @ts-ignore
const modele = new rw.HostedModel({
  // EMAIL clemvoegele@gmail.com : fully used
  // url: "https://fashion-illustrations-d515a0ce.hosted-models.runwayml.cloud/v1/",
  // token: "clAH7CRoH1FdrNmmZUY1DA==",

  // EMAIL clemence.voegele@gmail.com : fully used
  // url: "https://fashion-illustrations-c90f7f2f.hosted-models.runwayml.cloud/v1/",
  // token: "djqRhBB66SmA+ih0Cu7VFw==",

  // EMAIL Julia052000@hotmail.fr : fully used
  // url: "https://fashion-illustrations-ce03057f.hosted-models.runwayml.cloud/v1/",
  // token: "BfGfLZ+S0EZnPmo+SSbbzg==",

  // EMAIL jujuclemimac@gmail.com : fully used
  // url: "https://fashion-illustrations-87956c47.hosted-models.runwayml.cloud/v1/",
  // token: "AFv/U9ziH45utMQmagpKuQ==",

  // EMAIL julencefougele@gmail.com : fully used
  url: "https://fashion-illustrations-d94c60f1.hosted-models.runwayml.cloud/v1/",
  token: "8afun+/O0z5p/JuFPHn2vQ==",
})


// -------------------
//       Drawing
// -------------------

function draw() 
{
  background(0)
  if (dance) 
  {
    image(dance, 0, 0,width,height)
  }
}

function generateDance() 
{
  const data = {
    z: z,
    truncation: truncation
  }

  modele.info().then(info => console.log(info))

  modele.query(data).then(gotImage)
}

function gotError(error) 
{
  console.error(error)
}

function gotImage(result) {
  dance = createImg(result.image)

  // Download every generated picture
  // @ts-ignore
  p5.prototype.downloadFile(result.image, count.toString(), "png")

  dance.hide()

  // Initialization of the variables depending the number of frames
  const theta = map(count, 0, params.MaxFrame - 1, 0, TWO_PI * z_index.length)
  const index = floor(map(count, 0, params.MaxFrame - 1, 0, z_index.length))

  // Equation of a circle to loop like a GIF
  z[z_index[index][0]] = cos(theta + TWO_PI / 8)
  z[z_index[index][1]] = sin(theta + TWO_PI / 8)

  // Reinitialization of the parameters before changing others parameters in another loop
  if (index > 0) 
  {
    z[z_index[index-1][0]] = 1/sqrt(2)
    z[z_index[index-1][1]] = 1/sqrt(2)
  }

  // Generating the next pictures until it reach the number of frames we wanted
  count ++
  if (count < params.MaxFrame) 
  {
    generateDance()
  }
}

// -------------------
//    Initialization
// -------------------

function setup() 
{
  p6_CreateCanvas()

  // Initializing the parameters of the first picture generated
  for (let i = 0; i < 512; i++) 
  {
    z[i] = 0   
  }

  for (let i = 0; i < z_index.length; ++i) 
  {
    z[z_index[i][0]] = 1/sqrt(2)
    z[z_index[i][1]] = 1/sqrt(2)
  }   

  createButton('dance').mousePressed(() => {count = 0; generateDance()})
}

function windowResized() 
{
  p6_ResizeCanvas()
}
