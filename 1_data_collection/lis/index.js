/*var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '38Zbwns4eq4p5EDTxk2FPnyoB',
    consumer_secret: 'l0yBSCHWAWo3qKASLexE5EzmoIOJmxvBqa1laFL3Am3A8ZYMPd',
    access_token_key: '925139267935911937-DZh8ui2YbZiI0jTNrgX0GFNxL9trCxI',
    access_token_secret: '43PKwuCzTk7x8ojYOueSjraF2D5Me6QLYpbkGQybo1mX5'
});*/


const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, mongoclient) {
    if (err) throw err;


    var Twitter = require('node-tweet-stream');
    var client = new Twitter({
        consumer_key: '38Zbwns4eq4p5EDTxk2FPnyoB',
        consumer_secret: 'l0yBSCHWAWo3qKASLexE5EzmoIOJmxvBqa1laFL3Am3A8ZYMPd',
        token: '925139267935911937-DZh8ui2YbZiI0jTNrgX0GFNxL9trCxI',
        token_secret: '43PKwuCzTk7x8ojYOueSjraF2D5Me6QLYpbkGQybo1mX5'
    });

    /*

    access_token = '925139267935911937-DZh8ui2YbZiI0jTNrgX0GFNxL9trCxI'
    access_token_secret = '43PKwuCzTk7x8ojYOueSjraF2D5Me6QLYpbkGQybo1mX5'
    consumer_key = '38Zbwns4eq4p5EDTxk2FPnyoB'
    consumer_secret = 'l0yBSCHWAWo3qKASLexE5EzmoIOJmxvBqa1laFL3Am3A8ZYMPd'
    */


    client.on('tweet', function (tweet) {

        //eliminate retweets
        //if (tweet.retweeted) return;
        if (tweet.text.startsWith('RT')) return;

        console.log(tweet.text + "\n\n");
        tweet._id = tweet.id_str;
        // if (tweet.extended_tweet) console.log(tweet.extended_tweet.full_text)
        mongoclient.db('elisabethtweets').collection('v0').insertOne(tweet, function (err) {
            if (err) console.error(err)
        });
    });

    client.on('error', function (err) {
        console.error(err)
    });

    client.track('Acuerdo de paz');
    client.track('FARC');
    client.track('Plebiscito');
//client.track('Acuerdo sobre lo fundamental');
//client.track('Reconciliacion');
    client.track('#ElPaisPrimero');
//client.track('Paz sí, pero no así');
    client.track('Comisionado de paz');
    client.track('impunidad FARC');
    client.track('#Colombia');

});