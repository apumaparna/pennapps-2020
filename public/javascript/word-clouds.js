//go to the top and put a multiline comment
/* global flag dataReady
 */
//genius ids
//https://cmichel.io/song-lyrics-in-nodejs - genius
//https://github.com/sgratzl/chartjs-chart-wordcloud

//only running if stuff is populated aka flag is True
import Genius from "genius-api";
import { getLyrics, getSong } from "genius-lyrics-api";

const clientId = process.env.GENIUS_ID;
const clientSecret = process.env.GENIUS_SECRET;
const accessToken = process.env.GENIUS_TOKEN;
const genius = new Genius(accessToken);

// testing with example song
const options = { // I guess create one of these for every song
  apiKey: accessToken,
  title: "Blinding Lights",
  artist: "The Weeknd",
  optimizeQuery: true
};

getLyrics(options).then(lyrics => console.log(lyrics));

getSong(options).then(song =>
  console.log(`
    ${song.id}
    ${song.url}
    ${song.albumArt}
    ${song.lyrics}`)
);

function commonWords(lyrics) {
  // model is ready
  var words = lyrics.split(/[\s\r\n]/i);
  console.log(words);
  //ml5 somewhere here
}

commonWords("This is a sample song\n with sample lyrics");

if (flag && dataReady) {
  //import into HTML
  spotData = data; //where is data from??
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
