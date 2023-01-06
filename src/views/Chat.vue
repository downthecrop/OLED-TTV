<template>
  <div class="wrapper">
    <!-- Add each message -->
    <div v-if="scrollHint" class="scrollToBottomHint" @click="scrollToBottom">
      <p style="text-align:center;">Scroll to bottom</p>
    </div>
    <div v-for="message in messages">
      <p class="author" :style='`color: ${message.color};`'>
      <div class="badges" v-for="badge in message.badges">
        <img class="badge mx-1" :src=badge.img :title=badge.info />
      </div>
      {{ message.author }}:
      </p>
      <p class="chat-message" v-html="message.html"></p>
    </div>
  </div>
</template>

<script>
import tmi from 'tmi.js';
import emoteParser from "tmi-emote-parse";
export default {
  data() {
    return {
      messages: [],
      scrollHint: false,
    }
  },
  methods: {
    scrollToBottom: function () {
      this.scrollHint = false;
      window.scrollTo(0, document.body.scrollHeight);
    },
    scrollHandler: function () {
      const scroll = window.scrollY + window.innerHeight;
      this.scrollHint = document.body.offsetHeight - scroll >= 100
    },
    unableToConnectMessage: function() {
      this.messages.push({
        html: "Connect timedout. Check that the channel name is correct.",
        author: "ERROR",
        color: "red",
        badges: []
      })
    }
  },
  created() {
    window.addEventListener('scroll', this.scrollHandler)
    const connectionTimeout = setTimeout(this.unableToConnectMessage, 5000);

    /*

    TODO:
    - GET CHANNEL NAME FROM URL
    - Add a font size slider
    - catch banned users and delete messages
    - Slider for max width before wrapping
    - Add timestamps

    */

    // Idk if these are really something that requires safeguarding..
    // Needed for emotes & badges
    emoteParser.setTwitchCredentials("h246g1a2yne9xisxqs9bnncxlx3ycs", "rv1gxla1c5aersfohwf0zty83rkk14");

    const CHANNEL_NAME = this.$route.params.username

    const client = new tmi.Client({
      options: { debug: false, skipMembership: true },
      channels: [CHANNEL_NAME]
    });

    client.connect()
    client.on("join", (channel, username, self) => {
        clearInterval(connectionTimeout)
        // Show a connected message~
        this.messages.push({
        html: "Connected to "+channel,
        author: "Status",
        badges: []
      })
      
    });

    emoteParser.loadAssets(CHANNEL_NAME);

    client.on('message', (channel, userstate, message, self) => {
      //console.log(userstate)
      const m = {
        html: emoteParser.replaceEmotes(message, userstate, channel, self),
        emotes: emoteParser.getEmotes(message, userstate, channel, self).reverse(),
        author: userstate["display-name"],
        badges: emoteParser.getBadges(userstate, channel),
        color: userstate.color,
      }

      // Replace "<img class" with the "<img title='' class" to let users 
      // to hover over to see what the emote code is
      for (const emotes of m.emotes) {
        m.html = m.html.replace("<img class=", `<img title="${emotes.code}" class=`);
      }

      this.messages.push(m)
      if (!this.scrollHint) {
        this.$nextTick(this.scrollToBottom)
      }
    });

    client.on("clearchat", (channel) => {
      this.messages = []
    });
  }
}

</script>

<style>
:root {
  --font-base: "Inter", "Roobert", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-display: "Roobert", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: monospace;
  --font-size-1: 5.4rem;
  --font-size-2: 3.6rem;
  --font-size-3: 2.4rem;
  --font-size-4: 1.8rem;
  --font-size-5: 1.4rem;
  --font-size-6: 1.3rem;
  --font-size-7: 1.2rem;
  --font-size-8: 1.2rem;
  --font-size-base: 1.3rem;
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-hdr: 400;
  --line-height-body: 1.5;
  --line-height-heading: 1.2;
  --base-rem-unit: 10;
}

.scrollToBottomHint {
  z-index: 999;
  border-radius: 4px;
  margin: 10px;
  font-size: var(--font-size-4);
  position: fixed;
  color: white;
  padding: 10px;
  bottom: 0px;
  width: 100%;
  background-color: rgba(28, 22, 22, 0.9);
}

body {
  margin: 0px;
  padding: 0px;
  font-family: var(--font-base);
  background-color: black;
}

.wrapper1 {
  transform: rotate(90deg);
  transform-origin: bottom left;
  position: absolute;
  top: -100vw;
  height: 100vw;
  width: 100vh;
  color: #fff;
}

.author {
  font-size: var(--font-size-4);
  text-shadow: 0px 0px 1px #fff, 1px 1px 4px #ccc;
  display: inline;
  color: white;
  font-weight: bold;
}

.chat-message {
  font-size: var(--font-size-4);
  color: white;
  display: inline;
}

.message-emote {
  display:inline;
  margin: 1vw;
  height: 1vw;
}

.badges {
  display: inline;
}

.badge {
  width: 1vw;
  display: inline;
}
</style>