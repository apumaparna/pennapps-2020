//go to the top and put a multiline comment
/* global flag dataReady 
 */

/* global Genius getLyrics getSong*/

//https://cmichel.io/song-lyrics-in-nodejs - genius
//https://github.com/sgratzl/chartjs-chart-wordcloud

//only running if stuff is populated aka flag is True
//import Genius from 'genius-api';
//var Genius = require('node-genius');
//var lyrics = require('genius-lyrics-api');
import { getLyrics, getSong } from "../genius-lyrics-api";

const clientId = 'TUXMa_LvEn6woaeEVlvU7uvKy0kcCvTjHV_wzpXtLDyQdJVqBI_As6NwfAGmgMTW';
const clientSecret = 'FgHrPrRTNzRurqI30NL2jS_NmHVVbjYgLJpxUdy9GlxoXDVbZL6Ng7TXjM1jok-kJxQhJoeLhGXH2Jmc7FPQoA';
const accessToken = 'j80a0lCWWjLxjdCB1WfR1zW_kJNoHF_EqA9PfYD6Da2TPLbF8zHj41UqMnKprR8u';
//const genius = new Genius(accessToken);

// testing with example song
const options = { // I guess create one of these for every song
  apiKey: accessToken,
  title: "Blinding Lights",
  artist: "The Weeknd",
  optimizeQuery: true
};

lyrics.getLyrics(options).then(lyrics => console.log(lyrics));

lyrics.getSong(options).then(song =>
  console.log(`
    ${song.id}
    ${song.url}
    ${song.albumArt}
    ${song.lyrics}`)
);

function commonWords(lyrics) {
  // model is ready
  console.log(words);
  var words = lyrics.split(/[\s\r\n]/i);
  console.log(words);
  //ml5 somewhere here
}

commonWords("This is a sample song\n with sample lyrics");

if (flag && dataReady) {
  //import into HTML
  //spotData = data; //where is data from??
  //ok my own attempt

  //https://github.com/shahyar/lyrics-js

  //access the Spotify ID = code
  //use Musixmatch to access the lyrics
  //go thru ALLLL the songs and add lyrics to list
  //subtract unimportant words (find list online)
  //find frequency of important words
  //corresponding to text size ? align somehow?

  //const clientId = process.env.GENIUS_ID;
  //const clientSecret = process.env.GENIUS_SECRET;
  //const accessToken = process.env.GENIUS_TOKEN;

  //const genius = new Genius(accessToken);

  //remember to import package in HTML

  // test code below for genius api:
  //const genius = new Genius(accessToken);
  //genius.getArtistIdByName("Drake")
  //.then(artistId => {/* ... */})
  //.catch(err => console.error(err));

  //  const lyricist = new Lyricist(accessToken)
  //wait
}
