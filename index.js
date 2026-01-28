const tmi = require('tmi.js');
const getUserProfile = require('./getUserProfile.js');
const getUserAwards = require('./getUserAwards.js');
const CREDS = require('./CREDS.json');

const client = new tmi.Client({
  //options: { debug: true },
    identity: {
        username: CREDS.twitch_username,
        password: CREDS.twitch_password
    },
    //// The channels you want your bot to be in
    channels: [ 'grimmchiefer1984','drunkatgt','popcorn_cannon' ]
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
      let userId = message.substring(4);
	     console.log('Fetching User: %s', userId);

        getUserProfile(userId)
        .then(function(profile) {
            console.log('%j',profile);
            if (profile) {
              getUserAwards(userId)
              .then(function(awards) {
                //console.log('%j',awards)
                client.say(channel, formatMessage(tags.username, profile, awards));  
              });              
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
function formatMessage(username, profile, awards) {
    var game = (profile.lastGame && profile.lastGame.title) || 'NOTHING';
    var message = username + ', ' + profile.user + ' is currently ranked ' + profile.rank + ' / ' + profile.totalRanked + ' (Top ' + (profile.rank*100/profile.totalRanked).toFixed(4) + '%). They were last playing: ' + game + '.';
    message = message + ' They have mastered ' + awards.masteryAwardsCount + ' games and beaten ' + awards.beatenHardcoreAwardsCount + ' games.'
    return message;
}

