const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const TWEETS_FILE = './tweets.json';

// Hilfsfunktion zum Laden der Tweets aus der Datei
function loadTweets() {
    if (fs.existsSync(TWEETS_FILE)) {
        const data = fs.readFileSync(TWEETS_FILE);
        return JSON.parse(data);
    }
    return [];
}

// Hilfsfunktion zum Speichern der Tweets in die Datei
function saveTweets(tweets) {
    fs.writeFileSync(TWEETS_FILE, JSON.stringify(tweets, null, 2));
}

// API-Endpunkt zum Abrufen aller Tweets
app.get('/api/tweets', (req, res) => {
    const tweets = loadTweets();
    res.json(tweets);
});

// API-Endpunkt zum Erstellen eines neuen Tweets
app.post('/api/tweets', (req, res) => {
    const tweet = req.body;
    const tweets = loadTweets();
    tweet.timestamp = Date.now();
    tweets.push(tweet);
    saveTweets(tweets);
    res.status(201).json(tweet);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
