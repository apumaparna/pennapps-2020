//genius ids
const clientId = 'TUXMa_LvEn6woaeEVlvU7uvKy0kcCvTjHV_wzpXtLDyQdJVqBI_As6NwfAGmgMTW'
const clientSecret = 'FgHrPrRTNzRurqI30NL2jS_NmHVVbjYgLJpxUdy9GlxoXDVbZL6Ng7TXjM1jok-kJxQhJoeLhGXH2Jmc7FPQoA'
const accessToken = 'Dz-Ur8bv6CMgKDRU2_OieIgifG4yEfLvvmebv4TTUbmbSTElOY-23rFct6l62UUX'

const lyricist = new Lyricist(accessToken)

function commonWords(lyrics) {
  // model is ready
  var words = lyrics.split(/[\s\r\n]/i)
  console.log(words)
}

commonWords("This is a sample song\n with sample lyrics");