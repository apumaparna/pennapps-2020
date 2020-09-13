/* global getData spotifyData flag data dataReady featureData*/

/* global windowWidth windowHeight createCanvas background noStroke colorMode HSB circle fill noFill random color stroke*/

//https://ml5js.org/reference/api-Sentiment/

let data = [];
let features = [];

let spotReady = false;
let featReady = false;

let objArr = [];
let wavArr = [];

// let spotData = [];
function setup() {
  console.log("startScript");

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(100);

  if (flag == true) {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(100);
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

    background(100);
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

  background(100);

  if (spotReady && featReady) {
    if (objArr.length > 0) {
      // console.log(objArr);
      objArr.forEach(function(obj) {
        obj.draw();
        obj.pulse();
      });
    }
    if (wavArr.length > 0) {
      let removeArr = [];

      for (let i = 0; i < wavArr.length; i++) {
        let wave = wavArr[i];
        wave.draw();
        let op = wave.getOpacity();
        if (op < 0) {
          // console.log("disappeared");
          removeArr.push(i); 
        }
      }

      // console.log("moving on");
      for (let i = 0; i < removeArr.length; i++) {
        let j = removeArr[i];
        wavArr.splice(j, 1);
        // console.log(wavArr.length);
      }
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
    this.pulseRate = (this.tempo / 200) * 1;

    this.color = 210 - 180 * this.valence;
    // this.x = random(windowWidth);
    // this.y = random(windowHeight);
    // this.r = random(50);

    this.r = this.pop * 0.9;

    this.x = (windowWidth / 22) * (this.pref + 1);
    this.y = windowHeight - windowHeight * this.dance;

    this.waves = [];

    this.rr = this.r;
  }

  // Draw each circle
  draw() {
    noStroke();
    fill(this.color, 80, 95, 90);
    circle(this.x, this.y, this.r);
  }

  pulse() {
    // this.r -= 1;

    if (this.growing) {
      if (this.r <= this.pop * 0.9 * 1.2) {
        this.r += this.pulseRate;
      } else {
        this.growing = false;
      }
    } else {
      if (this.r >= this.pop * 0.9) {
        if (this.r >= this.pop * 0.9 * 1.2) {
          // console.log("reached");
          wavArr.push(new Ripple(this.color, this.x, this.y, this.r));
        }
        this.r -= this.pulseRate;
      } else {
        this.growing = true;
      }
    }
  }
}

class Ripple {
  constructor(color, x, y, r) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.r = r;
    this.opacity = 100;
  }

  draw() {
    // console.log("ripple");
    noFill();
    stroke(this.color, 100, 100, this.opacity);
    circle(this.x, this.y, this.r);
    this.r += 2;
    this.opacity -= 1.2;
  }

  getOpacity() {
    return this.opacity;
  }
}
