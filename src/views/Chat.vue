<template>
  <div class="wrapper">
    <div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <button class="modal__close" @click="showModal = false">
        <mdi-close></mdi-close>X
      </button>
      <span class="modal__title">Settings</span>
      <div class="modal__content">
        <p>Something <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></p>
        <p>Something2 <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></p>
        <p>Something3 <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></p>
        <p>Something4 <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></p>
      </div>
    </vue-final-modal>
    <v-button @click="showModal = true">Open modal</v-button>
  </div>
    <!-- Add each message -->
    <div v-if="scrollHint" class="scrollToBottomHint" @click="scrollToBottom">
      <p style="text-align:center;">Scroll to bottom</p>
    </div>
    <div class="break-all" v-for="message in messages">
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
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
export default {
  components: {
    VueFinalModal,
    ModalsContainer
  },
  data() {
    return {
      messages: [],
      showModal: false,
      scrollHint: false,
      maxScrollback: localStorage.getItem("maxScrollback") || 500,
      textSize: localStorage.getItem("textSize") || "1.8rem",
      emoteSize: localStorage.getItem("emoteSize") || "1vw",
      showBadges: localStorage.getItem("showTimestamps") || true,
      showBadges: localStorage.getItem("showBadges") || true,
      badgeSize: localStorage.getItem("badgeSize") || "1vw",
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
    - SETTINGS MODAL
      - Add a font size slider
      - Slider for max width before wrapping
      - Add timestamps
      - New messages on the bottom or on the top?
    
    - catch banned users and delete messages
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

      console.log(m.html)

      // Replace "<img class" with the "<img title='' class" to let users 
      // to hover over to see what the emote code is
      for (const emote of m.emotes) {
        const re = new RegExp(`<img class="message-emote" ?src="${emote.img}"/>`,'g');
        m.html = m.html.replaceAll(re, `<img title="${emote.code}" class="message-emote" src="${emote.img}"/>`);
      }

      this.messages.push(m)
      if(this.messages.length > this.maxScrollback)
        this.messages.shift()
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

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
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