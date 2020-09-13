# lambda

_Get into your musical headspace._

## Your Project

## Inspiration

Life during a pandemic is difficult. Every day, the news tells us another disheartening story of ignorance, intolerance, and injustice. In times of strife, the human instinct is to turn to art. We crack jokes, we become amateur artisans, and we listen to music. These unite us, especially as we live socially-distanced lives. Our group was inspired by the power of fusing music, art, and technology to bring communities together. Named after the physics symbol for wavelength, **lambda** allows us to discover more about what kinds of music bring us stability amidst a world of uncertainty, and more lightheartedly, to find out if our friends are grooving to the same frequencies as we are.

## What it does

**Lambda** is a multi-dimensional visual analyzer of your top Spotify tracks. This visual analyzer connects the following metrics in a personalized animation:

- **Preference**: How many times you have listened to the song recently
- **Valence**: How positive the song is
- **Popularity**: How popular the song is among Spotify users
- **Tempo**: The speed of the song

In addition, **lambda** analyzes the lyrics of your top songs using machine learning sentiment analysis and to determine which words appear most frequently in the songs you listen to.

Through the combinations of these techniques, **lambda** provides a unique, musical view into your headspace, which can be easily shared with your friends and family.

## How we built it

We used Glitch to work collaboratively and remotely on this project. The entire software was created using a combination of javascript, HTML, and CSS. We used the Spotify Web API to get the user's Spotify data and we used the Genius Web API to get the lyrics of the user's top 20 Spotify songs for further analysis. The ML aspect of the project was powered by Sentiment from ml5.js and the animations in the visual map used the p5.js library. We worked with Bootstrap for the front-end part of this project.

## Challenges we ran into

We ran into multiple challenges along the way. For one, we all started this project with limited knowledge of javascript. The majority of the group had no prior javascript experience before starting this hackathon, but we felt that creating a website would be the best approach for **lambda**.

It was also our first time working the web APIs and we ran into a number of problems along the way. One problem we struggled with for a while was setting up the Spotify API. For a long time, our results were coming back as null. We eventually realized that we had inadvertently disrupted the client & server interaction. This was our first time learning this concept. Another issue we struggled with was authentication, a problem which we then resolved by including it in the header of the get request. We also struggled with the Genius web API. In the process, we learned about modules, different types of imports, and event listeners. This had definitely been a learning process.

We also struggled with the front-end portion of our project. Half of our team was unfamiliar with bootstrap, and we had trouble integrating the front-end design with our back-end product.

## Accomplishments that we're proud of

We are immensely proud of ourselves for how much we accomplished. Considering that the majority of our team didn't know JavaScript and we had no experience with web APIs before starting this hackathon, we are immensely proud of ourselves for creating a whole project in JavaScript and implementing two web APIs. This has been a tremendous learning opportunity and we had a lot of fun while working on **lambda**.

## What we learned

We learned about how JavaScript, HTML, and CSS interact. We also learned about web services, APIs, authentication, and client-server interaction.

## What's next for lambda

Future plans include extending the dimensionality of the visualization to give you more information visually.
