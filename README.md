# OLED-TTV

![Preview](https://i.imgur.com/3en3fHm.png)

Twitch Chat with BTTV, FFZ, 7tv, emotes. OLED Friendly!

https://downthecrop.github.io/OLED-TTV/

> built with Vue + tmi.js

# Install

`npm i`

# Dev

`npm run dev`

# Build

`npm run build`

# Push New Release to gh-pages

`git add dist && git commit -m "adding dist subtree"`
`git subtree push --prefix dist origin gh-pages`

# Generate OAUTH token from tmi emote parser

### From #Examples of the three flows
>https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/

https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=<YOUR_CLIENT_ID_FROM_TWITCH_API_HERE>&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f00267

- Copy the `token` from the redirected response and add "oauth:" to the front.
