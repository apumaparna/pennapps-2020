/* global noCanvas ml5 createP createInput createButton */

/* global spotifyData */

let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;
let sentimentScores = [];
let allLyrics = "";
//const geniusLyrics = require('genius-lyrics-api').getLyrics;
//const geniusSong = require('genius-lyrics-api').getSong;

const clientId =
  "TUXMa_LvEn6woaeEVlvU7uvKy0kcCvTjHV_wzpXtLDyQdJVqBI_As6NwfAGmgMTW";
const clientSecret =
  "FgHrPrRTNzRurqI30NL2jS_NmHVVbjYgLJpxUdy9GlxoXDVbZL6Ng7TXjM1jok-kJxQhJoeLhGXH2Jmc7FPQoA";
const accessToken =
  "j80a0lCWWjLxjdCB1WfR1zW_kJNoHF_EqA9PfYD6Da2TPLbF8zHj41UqMnKprR8u";

function sentSetup() {
  console.log("sentiment called");
  sentiment = ml5.sentiment("movieReviews", modelReady);
  // statusEl = createP("Loading Model...");
  // sentimentResult = createP("sentiment score:");
}

// function draw() {
//   console.log("draw");
//   if (spotifyData.length > 0 && data.length == 0) {
//     data = spotifyData;
//     console.log("ready1");
//     spotReady = true;
//     console.log(data);

//   }

//   if (spotReady) {
//     // looping code
//     console.log("spotready")
//   }

// }

function getSentiment(text) {
  //return sentiment score
  // get the values from the input
  //const text = inputBox.value();
  // sentiment = ml5.sentiment("movieReviews", modelReady);
  // make the prediction
  const prediction = sentiment.predict(text);

  // display sentiment result on html page
  sentimentResult.html("Sentiment score: " + prediction.score);
  console.log("Sentiment score: " + prediction.score);
  return prediction.score;
}

function avgSentiment() {
  var sum = 0;
  for (let i=0; i<sentimentScores.length; i++) {
    sum+=sentimentScores[i];
  }
  return sum/sentimentScores.length;
}

function modelReady() {
  // model is ready
  statusEl.html("model loaded");

  var liability =
    "Baby really hurt me Crying in the taxi He don't wanna know me Says he made the big mistake of dancing in my storm Says it was poison \
So I guess I'll go home Into the arms of the girl that I love The only love I haven't screwed up She's so hard to please \
But she's a forest fire I do my best to meet her demands Play at romance, we slow dance In the living room, but all that a \
stranger would see Is one girl swaying alone Stroking her cheek They say, \"You're a little much for me You're a liability \
You're a little much for me\" So they pull back, make other plans I understand, I'm a liability Get you wild, make you leave \
I'm a little much for E-a-na-na-na, everyone The truth is I am a toy that people enjoy 'Til all of the tricks don't work anymore \
And then they are bored of me I know that it's exciting Running through the night, but Every perfect summer's Eating me alive \
until you're gone Better on my own They say, \"You're a little much for me You're a liability You're a little much for me\" \
So they pull back, make other plans I understand, I'm a liability Get you wild, make you leave I'm a little much for \
E-a-na-na-na, everyone They're gonna watch me Disappear into the sun You're all gonna watch me Disappear into the sun";

  //commonWords(liability);
}

/******************** Song Lyrics API https://lyricsovh.docs.apiary.io/# ********/

function getLyrics(artistToFetch, songToFetch) {
  //let artistToFetch = document.querySelector("#artist").value;
  //let songToFetch = document.querySelector("#song").value;
  // let output = document.querySelector("#song-lyrics");
  let baseURL = "https://api.lyrics.ovh/v1/";
  let lyricsURL = `${baseURL}${artistToFetch}/${songToFetch}`;

  fetch(lyricsURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      // output.innerHTML = "";

      if (json.error) {
        throw "lyrics unavailable";
      }

      let lyrics = json.lyrics;

      lyrics = lyrics.split("\n");

      let lyricOutput = "";
      for (let lyric of lyrics) {
        // console.log(lyric);
        lyricOutput += `${lyric}` + " ";
        //lyricOutput += `<p class="song-lyric">${lyric}</p>`;
      }

      //console.log(lyricOutput);
      sentimentScores.push(getSentiment(lyricOutput)); //add sentiment score to array
      allLyrics += lyricOutput; //add to lyrics block
      //console.log(allLyrics);
      //return lyricOutput;
    });
}

var stopwords = [
  "about",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "being",
  "but",
  "by",
  "came",
  "can",
  "come",
  "could",
  "did",
  "do",
  "each",
  "for",
  "from",
  "get",
  "got",
  "has",
  "had",
  "he",
  "have",
  "her",
  "here",
  "him",
  "himself",
  "his",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "like",
  "make",
  "many",
  "me",
  "might",
  "more",
  "most",
  "much",
  "must",
  "my",
  "now",
  "of",
  "on",
  "or",
  "our",
  "out",
  "said",
  "should",
  "since",
  "some",
  "such",
  "take",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "up",
  "very",
  "was",
  "way",
  "we",
  "well",
  "were",
  "what",
  "where",
  "which",
  "while",
  "who",
  "with",
  "would",
  "your",
  "a",
  "i",
  "so",
  "oh",
  "yeah",
  "not",
  "will",
  "when",
  "woo",
  "yah",
  "just", "know"
];

function frequencies(arr) {
  //frequencies of words in array
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b]; //a specifies each unique element; b is the number of times each occurs
}

function commonWords(lyrics) {
  //return array of common words
  // model is ready
  //console.log(lyrics);
  var allWords = lyrics.split(/[,.!?;\s\n\r]/i);
  var words = [];
  for (let i = 0; i < allWords.length; i++) {
    if (
      allWords[i] != "" &&
      stopwords.includes(allWords[i].toLowerCase()) == false &&
      allWords[i].includes("'") == false &&
      allWords[i].includes('"') == false
    ) {
      words.push(allWords[i].toLowerCase());
    }
  }
  //console.log(words);

  var frqWords = [];
  var maxs = [];
  var frqs = frequencies(words); //[words,frqs]
  var frqsCopy = [...frqs[1]];
  for (let i = 0; i < 20; i++) {
    //gets 10 most common words
    var max = Math.max.apply(null, frqsCopy);
    maxs.push(max);
    var index = frqsCopy.indexOf(max);
    frqsCopy.splice(index, 1);
  }

  for (let i = 0; i < frqs[0].length; i++) {
    if (maxs.includes(frqs[1][i])) {
      frqWords.push(frqs[0][i]);
    }
  }
  //console.log(frqWords);
  //console.log(words.join(" "));
  //getSentiment(words.join(" "));

  return frqWords;
}

//index.js:113 Uncaught TypeError: Cannot read property 'i'd' of undefined
//at index.js:113
//at Array.map (<anonymous>)
//at t.value (index.js:112)
//at getSentiment (sentiment-analysis.js:31)
//at commonWords (sentiment-analysis.js:71)
//at sentiment-analysis.js:80

//const sentiment = ml5.sentiment('movieReviews', modelReady);
