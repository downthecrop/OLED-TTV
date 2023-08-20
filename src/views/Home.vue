<template>
  <div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
  <div class="top-6 right-6 fixed text-4xl text-gray-800">
    
    <li class="inline-block">
      <a target="_new" href="https://twitter.com/downthecrop">
        <font-awesome-icon icon="fa-brands fa-twitter" />
      </a>
    </li>
    <li class="inline-block">
      <a target="_new" href="https://github.com/downthecrop">
        <font-awesome-icon icon="fa-brands fa-github" />
      </a>
    </li>
    <li class="inline-block">
      <a target="_new" href="https://www.twitch.tv/downthecrop">
        <font-awesome-icon icon="fa-brands fa-twitch" />
      </a>
    </li>
  </div>
  <div class="max-w-5xl p-12 pt-40 mx-auto">
    <div class="mb-2 text-xs tracking-wider font-semibold" style="color: rgb(93, 137, 179);">@downthecrop</div>
    <div class="font-bold text-white text-3xl leading-tightest mb-4">OLED-TTV</div>
    <form @submit.prevent="openChat">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input v-model="channel" autofocus type="search" id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style="background: linear-gradient(135deg, rgb(28, 28, 33) 0%, rgb(15, 19, 26) 100%); color: rgb(221, 232, 240);"
          :placeholder="placeholder" required>
        <button type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-blue-800">&#x21A9;</button>
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
    openChat: function () {
      this.$router.push(this.channel)
    },
    autoTypePleaceholder: function () {
      const EXTENSION = "...     "
      if (!this.placeholderTyping) {
        this.placeholder = this.placeholder.substring(0, this.placeholder.length - 1);
        this.placeholderTyping = this.placeholder == "";
      } else {
        if (this.placeholder == this.placeholderNames[0]) {
          this.placeholderNames.push(this.placeholderNames.shift().replace(EXTENSION, ""));
          this.placeholderNames[0] = this.placeholderNames[0] + EXTENSION
          this.placeholderTyping = false;
        } else {
          this.placeholder += this.placeholderNames[0][this.placeholder.length]
        }
      }
    }
  },
  mounted() {
    // Just a cute little animation on the search box. shuffle the names first.
    this.placeholderNames.sort(function () { return 0.5 - Math.random() });
    setInterval(this.autoTypePleaceholder, 180);
  }
}

</script>

<style scoped>
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

body {
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: linear-gradient(315deg, rgba(51, 51, 51, 1) 0%, rgba(0, 0, 0, 1) 100%);
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

.wave {
  background: rgba(93, 137, 179, 0.03);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 10em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  bottom: 0;
  left: 0;
  z-index: -1;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
</style>