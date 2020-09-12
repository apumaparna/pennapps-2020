/* global getData spotifyData flag data dataReady featureData*/

/* global windowWidth windowHeight createCanvas background noStroke colorMode HSB circle fill random color*/

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
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  if (flag == true) {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(0);
    noStroke();
  }
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
        obj.pulse();
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
    
    this.growing = true;
    this.pulseRate = this.tempo/200 * 1; 

    this.color = 210 - 180 * this.valence;
    // this.x = random(windowWidth);
    // this.y = random(windowHeight);
    // this.r = random(50);
    
    this.r = this.pop *0.90;
    
    this.x = (windowWidth / 20) * this.pref;
    this.y = windowHeight - windowHeight * this.dance;
  }

  // Draw each circle
  draw() {
    console.log(this.tempo); 
    fill(this.color, 100, 100, 90);
    circle(this.x, this.y, this.r);
    // console.log(this.dance);
  }

  pulse() {
    // this.r -= 1;

    if (this.growing) {
      if (this.r <= this.pop *0.90 * 1.20) {
        this.r += this.pulseRate;
      } else {
        this.growing = false;
      }
    } else {
      if (this.r >= this.pop * 0.90) {
        this.r -= this.pulseRate;
      } else {
        this.growing = true;
      }
    }
  }

  // creates the radiation
  radiate() {}
}
