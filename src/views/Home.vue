<template>
<div class="w-full p-36 pt-40 mx-auto">
  <div class="uppercase mb-2 text-xs tracking-wider font-semibold" style="color: rgb(93, 137, 179);">Project</div>
  <div class="font-bold text-white text-3xl leading-tightest mb-4">OLED-TTV</div>
  <form @submit.prevent="openChat"> 
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="channel" autofocus type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style="background: linear-gradient(135deg, rgb(28, 28, 33) 0%, rgb(15, 19, 26) 100%); color: rgb(221, 232, 240);" :placeholder="placeholder" required>
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-slate-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">&#x21A9;</button>
      </div>
  </form>
</div>

</template>

<script>
export default {
  data() {
    return {
      channel: "",
      placeholder: "Channel name...                   ",
      placeholderNames: [
      "Cowsep",
      "AlphaXsc2",
      "BotezLive",
      "Doublelift",
      "imls",
      "midbeast",
      "ESL_SC2",
      "Caedrel",
      "Mmmothz",
      "묵아_",
      "lol_nemesis",
      "kaitlyn",
      "DeMusliM",
      "SCVODArchives",
      "shroud",
      "mifflemuffle",
      "Emiru",
      "ilysuiteheart",
      "charmies",
      "georgehotz",
      "dopa24",
      "marmellohh",
      "Kaztalek",
      "RotterdaM08",
      "TastelessTV",
      "LCS",
      "StarCraft",
      "ZombieGrub",
      "ClintStevens",
      "picklemancer",
      "Sour Not Hardcore",
      "Artosis",
      "ScarlettM",
      "Slicklikedat",
      "Chennerz",
      "itsHafu",
      "j_blow",
      "loltyler1",
      "BombJin",
      "Sovitia",
      "GSL",
      "Zfg1"
      ],
      placeholderTyping: false,
    }
  },
  methods: {
    openChat: function() {
      this.$router.push(this.channel)
    },
    autoTypePleaceholder: function(){
      if(!this.placeholderTyping){
        this.placeholder = this.placeholder.substring(0,this.placeholder.length-1);
        this.placeholderTyping = this.placeholder == "";
      } else {
        if(this.placeholder == this.placeholderNames[0]){
          this.placeholderNames.push(this.placeholderNames.shift());
          this.placeholderNames[0] = this.placeholderNames[0] + "...     "
          this.placeholderTyping = false;
        } else {
          this.placeholder += this.placeholderNames[0][this.placeholder.length]
        }
      }
    }
  },
  created() {
    // Just a cute little animation on the search box. shuffle the names first.
    this.placeholderNames.sort(function(){return 0.5 - Math.random()});
    const connectionTimeout = setInterval(this.autoTypePleaceholder, 180);
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
  background-attachment: fixed;
  background-color:black;
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
  height: 30px;
}

.badges {
  display: inline;
}

.badge {
  width: 25px;
  display: inline;
}
</style>