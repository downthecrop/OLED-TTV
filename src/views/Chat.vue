<template>
  <div class="wrapper">
    <div>
      <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showModal = false">
          <mdi-close></mdi-close>X
        </button>
        <span class="modal__title">Settings</span>
        <div class="modal__content">
          <p>Show Timesamps <input class="accent-pink-500" type="checkbox" v-model="showTimestamps"></p>
          <p>Show Badges <input class="accent-pink-500" type="checkbox" v-model="showBadges"></p>
          <p>Max Message History <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number" v-model="maxScrollback"></p>
          <p>Font Size <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number" v-model="fontSize" placeholder="2"></p>
          <p>Emote Size <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number" v-model="emoteSize" placeholder="2"></p>
        </div>
      </vue-final-modal>
      <button class="top-4 right-4 fixed text-4xl text-gray-900" @click="showModal = true"><font-awesome-icon icon="fa-solid fa-gear" /></button>
    </div>
    <!-- Add each message -->
    <div v-if="scrollHint" class="scrollToBottomHint" @click="scrollToBottom">
      <p style="text-align:center;">Scroll to bottom</p>
    </div>
    <div class="break-all cm-parent align-middle" v-for="message in messages">
      <div class="author">
      <div v-if="showTimestamps" class="inline-block align-middle text-white" style="text-shadow: none; font-weight: 100; font-size: .7em;">{{ message.timestamp }} </div>
      <div v-if="showBadges" class="badges" v-for="badge in message.badges">
        <img class="badge mx-1" :src=badge.img :title=badge.info />
      </div>
      <p class="inline align-middle" :style='`color: ${message.color};`'>{{ message.author }}: </p>
      <p class="chat-message align-middle" v-html="message.html"></p>
    </div>
      
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
      maxScrollback: parseInt(localStorage.getItem("maxScrollback")) || 500,
      fontSize: localStorage.getItem("fontSize"),
      emoteSize: localStorage.getItem("emoteSize"),
      showTimestamps: this.getBoolFromLocalStorage("showTimestamps", true),
      showBadges: this.getBoolFromLocalStorage("showBadges", true),
    }
  },
  watch: {
    maxScrollback(val) { localStorage.maxScrollback = val; },
    fontSize(val) {
      this.setRootCSS("--font-size", val + "rem")
      localStorage.fontSize = val;
    },
    emoteSize(val) {
      this.setRootCSS("--emote-height", val + "rem")
      localStorage.emoteSize = val;
    },
    showTimestamps(val) { localStorage.showTimestamps = val; },
    showBadges(val) { localStorage.showBadges = val; },
  },
  methods: {
    getBoolFromLocalStorage: function (key, _default) {
      if (localStorage.getItem(key) === null)
        return _default;
      return (localStorage.getItem(key) === "true")
    },
    setRootCSS: function (key, val) {
      document.documentElement.style.setProperty(key, val);
    },
    scrollToBottom: function () {
      this.scrollHint = false;
      window.scrollTo(0, document.body.scrollHeight);
    },
    scrollHandler: function () {
      const scroll = window.scrollY + window.innerHeight;
      this.scrollHint = document.body.offsetHeight - scroll >= 100
    },
    getCurrentTime: function () {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();

      // Add leading zeros if necessary
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      return hours + ":" + minutes;
    },
    unableToConnectMessage: function () {
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
    const CHANNEL_NAME = this.$route.params.username


    /*

    TODO:
    - SETTINGS MODAL
      - Add a font size slider
      - Slider for max width before wrapping
      - Add timestamps
      - New messages on the bottom or on the top?
    
    - catch banned users and delete messages
    */


    emoteParser.setTwitchCredentials("h246g1a2yne9xisxqs9bnncxlx3ycs", "rv1gxla1c5aersfohwf0zty83rkk14");
    emoteParser.loadAssets(CHANNEL_NAME);

    const client = new tmi.Client({
      options: { debug: false, skipMembership: true },
      channels: [CHANNEL_NAME]
    });

    client.connect()
    client.on("join", (channel, username, self) => {
      clearInterval(connectionTimeout)
      // Show a connected message
      this.messages.push({
        html: "Connected to " + channel,
        author: "Status",
        badges: []
      })

    });



    client.on('message', (channel, userstate, message, self) => {
      const m = {
        html: emoteParser.replaceEmotes(message, userstate, channel, self),
        emotes: emoteParser.getEmotes(message, userstate, channel, self),
        author: userstate["display-name"],
        timestamp: this.getCurrentTime(),
        badges: emoteParser.getBadges(userstate, channel),
        color: userstate.color,
      }

      // Replace "<img class" with the "<img title='' class" to let users 
      // to hover over to see what the emote code is
      for (const emote of m.emotes) {
        const re = new RegExp(`<img class="message-emote" ?src="${emote.img}"/>`, 'g');
        m.html = m.html.replaceAll(re, `<img title="${emote.code}" class="message-emote" src="${emote.img}"/>`);
      }

      this.messages.push(m)
      if (this.messages.length > this.maxScrollback)
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
  --emote-height: 2rem;
  --font-size: 2rem;
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

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 50vw;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border-color: #2d3748;
  background-color: #1a202c;
}

.modal-content p {
  color: white;
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
  text-shadow: 0px 0px 1px #fff, 1px 1px 4px #ccc;
  display: inline;
  color: white;
  font-weight: bold;
}

.chat-message {
  color: white;
  display: inline;
}

.cm-parent {
  font-size: var(--font-size);
}

.timestamp {
  font-size:.4em;
  vertical-align: text-bottom;
}

.message-emote {
  display: inline;
  margin-inline: .1rem;
  height: var(--emote-height);
}

.badges {
  display: inline;
}

.badge {
  width: 1em;
  display: inline;
}
</style>