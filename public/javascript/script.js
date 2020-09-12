/* global getData spotifyData flag data dataReady colorMode HSB circle fill random featureData*/

/* global windowWidth windowHeight createCanvas background*/

//https://ml5js.org/reference/api-Sentiment/

let data = [];
let features = [];

let spotReady = false;
let featReady = false;

let objArr = [];

// let spotData = [];
function setup() {
  console.log("startScript");

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0);

  if (flag == true) {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(0);
  }

  // if (dataReady == true) {
  //   console.log(data);
  //   spotData = data;
  //   console.log(spotData);
  // }
}

function draw() {
  if (spotifyData.length > 0 && data.length == 0) {
    data = spotifyData;
    console.log("ready1");
    spotReady = true;
    console.log(data);
  }
  if (featureData.length > 19 && features.length == 0) {
    features = featureData;
    console.log("ready2");
    featReady = true;
    console.log(features);
    console.log(features.length);
    
    background(0); 
    for (let i = 0; i < data.length; i++) {
      let trSpot = data[i];
      let trFeach = features[i]; 
      objArr.push(
        new SongObject(
          trFeach.valence,
          trFeach.danceability,
          trFeach.mode,
          trFeach.tempo,
          trSpot.popularity,
          i
        )
      );
    }
    
    console.log(objArr.length); 
  }
  
  background(0); 
  
  if (spotReady && featReady) {
    
    if (objArr.length > 0) {
      // console.log(objArr);
      objArr.forEach(function(obj) {
        obj.draw();
        // console.log("draw");
      });
    }
  }
}

class SongObject {
  constructor(valence, dance, mode, tempo, pop, pref) {
    this.valence = valence;
    this.dance = dance;
    this.mode = mode;
    this.tempo = tempo;
    this.pop = pop;
    this.pref = pref;

    this.color = 100;
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.r = random(50);
    // this.r = this.pref * 50;
    // this.x = (windowWidth / 100) * this.pop;
    // this.y = windowHeight - windowHeight * this.dance;
  }

  // Draw each circle
  draw() {
    fill(this.color);
    circle(this.x, this.y, this.r);
    // console.log(this.dance);
  }

  // creates the radiation
  radiate() {}
}
