const retroApi = require('@retroachievements/api');
const buildAuthorization = retroApi.buildAuthorization;
const getUserAwards = retroApi.getUserAwards;
const CREDS = require('./CREDS.json');

// First, build your authorization object.
const username = CREDS.ra_username;
const webApiKey = CREDS.ra_webApiKey;

const authorization = buildAuthorization({ username, webApiKey });

async function getUserData(username) {

   // Then, make the API call.
   const userAwards = await getUserAwards(authorization, {
      username: username
   })
   .catch(function(err) {
      console.error(err);
      return null;
   });

   return userAwards;
}

//// This returns a pointer to the getUSerData function so it can be included 
//   in other files.
module.exports = getUserData;
