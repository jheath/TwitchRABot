const retroApi = require('@retroachievements/api');
const buildAuthorization = retroApi.buildAuthorization;
const getUserSummary = retroApi.getUserSummary;
const CREDS = require('./CREDS.json');

// First, build your authorization object.
const username = CREDS.ra_username;
const webApiKey = CREDS.ra_webApiKey;

const authorization = buildAuthorization({ username, webApiKey });

async function getUserData(username) {

   // Then, make the API call.
   const userProfile = await getUserSummary(authorization, {
      username: username,
      recentGamesCount: 1,
      recentAchievementsCount: 1	
   })
   .catch(function(err) {
      console.error(err);
      return null;
   });

   return userProfile;
}

//// This returns a pointer to the getUSerData function so it can be included 
//   in other files.
module.exports = getUserData;
