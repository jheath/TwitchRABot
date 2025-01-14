### Get Twitch creds
  1. If you intend to use the bot with a "bot" account, create that Twitch account now.
  2. You can register the application in the naxt step with your bot account, or your main account depending on who you want to "own" the connection.
  3. Go to https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#examples-of-the-four-flows and follow the instructions to register an app. Unless you want to code an OAuth flow, use `http://localhost:3000` as the redirect URI.
  4. *As the user who will be responding in chat (e.g. bot)* log into Twitch.
  5. In the same browser, navigate to `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=<your client id goes here>&redirect_uri=http://localhost:3000&scope=channel:read:redemptions+bits:read+openid+user:read:email&claims={"id_token":{"email":null,"email_verified":null}}&state=c3ab8aa609ea11e793ae92361f002671&nonce=c3ab8aa609ea11e793ae92361f002671` making sure to put your application's client_id in the URL where it says.
  6. You will be asked to authorize the connection and then you'll be redirected to a URL on localhost.
  7. Look for the part of the URL that says `...access_token=somelongcodewithlettersandnumbers&...` and copy the part between the `=` and `&` e.g. (`somelongcodewithlettersandnumbers`).
  8. This is what you'll need for your Twitch password later.
  
### Get RetroAchivements creds
1. Navigate to `https://retroachievements.org/settings` and scroll down and get your `Web API Key`

   
### Get Code ready
1. Download the repo to the server where you want to run the bot.
2. Copy `CREDS.json.sample` to `CREDS.json`.
3. Open the `CREDS.json` file and put in your Twitch bot name, Twitch password, RA username, RA Web API Key.
4. The Twitch password will be `oauth:<the access token you copied earlier>`.
5. Install the dependencies with `npm install`.
6. Edit `index.js` to put in the name of the channels you want your bot to listen/respond.
7. Run `node index.js`.
8. ???
9. Profit!
