/* global noCanvas ml5 createP createInput createButton */

let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;

function setup() {
  console.log("sentiment called");
  // noCanvas();
  // initialize sentiment
  sentiment = ml5.sentiment("movieReviews", modelReady);

  // setup the html environment
  statusEl = createP("Loading Model...");
  // inputBox = createInput("Today is the happiest day and is full of rainbows!");
  // inputBox.attribute("size", "75");
  // submitBtn = createButton("submit");
  sentimentResult = createP("sentiment score:");

  // predicting the sentiment on mousePressed()
  // submitBtn.mousePressed(getSentiment);
}

function getSentiment(text) {
  // get the values from the input
  //const text = inputBox.value();
  // sentiment = ml5.sentiment("movieReviews", modelReady);
  // make the prediction
  const prediction = sentiment.predict(text);

  // display sentiment result on html page
  sentimentResult.html("Sentiment score: " + prediction.score);
  console.log("Sentiment score: " + prediction.score);
}

function modelReady() {
  // model is ready
  statusEl.html("model loaded");
  
  var hallelujah =
  "I'd heard there was a secret chord\nThat David played and it pleased the Lord\nBut \
  you don't really care for music, do you?\nWell, it goes like this\nThe fourth, the fifth, \
  the minor fall, the major lift\nThe baffled king composing Hallelujah\nHallelujah, Hallelujah \
  Hallelujah, Hallelujah";

  commonWords(hallelujah);
}

var stopwords = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i'];

function frequencies(arr) { //frequencies of words in array
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b]; //a specifies each unique element; b is the number of times each occurs
}

function commonWords(lyrics) {
  // model is ready
  //console.log(lyrics);
  var allWords = lyrics.split(/[,.!?;\s\n\r]/i);
  //console.log(allWords);
  var words = [];
  for (let i = 0; i < allWords.length; i++) {
    if (
      allWords[i] != "" &&
      stopwords.includes(allWords[i].toLowerCase()) == false &&
      allWords[i].includes("\'") == false
    ) {
      words.push(allWords[i].toLowerCase());
    }
  }
  console.log(words);
  
  var frqs = frequencies(words); //[a,b]
  
  //console.log(words.join(" "));
  getSentiment(words.join(" "));
}



//index.js:113 Uncaught TypeError: Cannot read property 'i'd' of undefined
    //at index.js:113
    //at Array.map (<anonymous>)
    //at t.value (index.js:112)
    //at getSentiment (sentiment-analysis.js:31)
    //at commonWords (sentiment-analysis.js:71)
    //at sentiment-analysis.js:80

//const sentiment = ml5.sentiment('movieReviews', modelReady);
