const tmi = require('tmi.js');
const getUserProfile = require('./getUserProfile.js');
const CREDS = require('./CREDS.json');

const client = new tmi.Client({
    identity: {
        username: CREDS.twitch_username,
        password: CREDS.twitch_password
    },
    //// The channels you want your bot to be in
    channels: [ 'benjaminmcp0tv', 'turtlewax85' ]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
   if (self) return;
   onChatMessage(channel, message, tags);
});

function onChatMessage(channel, message, tags) {
    //tags['display-name'] //Display Name
    //tags['username'] //username
 
   //// !ra command
   if (message.toLowerCase().substring(0,4) === '!ra ') {
	console.log('Fetching User: %s', message.substring(4));
        getUserProfile(message.substring(4))
        .then(function(profile) {
            console.log('%j',profile);
            if (profile) {
              client.say(channel, formatMessage(tags.username, profile));
            } 
	    else {
              client.say(channel, tags.username + ', I can\'t find that user, or some other error occured.');
            }
        });
   }
   else {
       //// Do something here if you want to log other chat
   }

}

//// Helper function to format code for the !ra command
function formatMessage(username, profile) {
    var game = (profile.lastGame && profile.lastGame.title) || 'NOTHING';
    var message = username + ', ' + profile.user + ' is currently ranked ' + profile.rank + ' / ' + profile.totalRanked + ' (Top ' + (profile.rank*100/profile.totalRanked).toFixed(4) + '%). They were last playing: ' + game + '.';

    return message;
}

