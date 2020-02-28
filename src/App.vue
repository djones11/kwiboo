<template>
  <div id="app">
    <div class="global_control_wrapper">
      <div class="language_picker_container">
        <div class="selected_language_container">
          <img :src="availableLanguage[chosenLanguage]">
          <span>{{ chosenLanguage.toUpperCase() }}</span>
          <span class="icon icon-caret-right"></span>
        </div>
      </div>
    </div>
    <Animals />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import britishFlag from "@/images/uk.svg";
import spanishFlag from "@/images/spain.svg";
import yoda from "@/images/yoda.png";

import Animals from "@/modules/Animals";

export default {
  data: function() {
    return {
      availableLanguage: {
        en: britishFlag,
        es: spanishFlag,
        yoda: yoda
      },
    };
  },
  components: {
    Animals
  },
  computed: {
    ...mapState(["chosenLanguage"])
  },
  methods: {
    ...mapMutations(["UPDATE_CHOSEN_LANGUAGE"])
  }
};
</script>

<style lang="scss">

.global_control_wrapper {
  padding: 8px;
}

.selected_language_container {
  display: flex;
  align-items: center;
  color: $light_text_colour;
  font-weight: 600;
  cursor: pointer;

  img {
    margin-right: 8px;
    width: 24px;
  }

  .icon {
    padding-left: 6px;
  }
}


body,
html,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
#app {
  color: $normal_text_colour;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  backface-visibility: hidden;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;

  :before,
  :after {
    -webkit-font-smoothing: antialiased;
  }
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-track {
  background-color: #f3f3f3;
  border-radius: 5px;
}
*::-webkit-scrollbar-thumb {
  background-color: #d9d9de;
  border-radius: 5px;
  border-top: 2px solid #fff;
}
[v-cloak] {
  display: none;
}
input,
button,
textarea {
  outline: none;
  border: none;
  appearance: none;
}
input::-ms-clear {
  display: none;
}
.page {
  height: 100%;
  width: 100%;
}
img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  user-select: none;
  object-fit: contain;
}
h1 {
  font-size: 2.2em;
  font-weight: 400;
  line-height: 1.4em;
  display: block;
  clear: both;
}
h2 {
  font-size: 1.8em;
  font-weight: 400;
  line-height: 1.4em;
  display: block;
  clear: both;
}
h3 {
  font-size: 1.3em;
  font-weight: 600;
  line-height: 1.4em;
  display: block;
  clear: both;
}
h4 {
  font-size: 1.1em;
  font-weight: 600;
  line-height: 1.4em;
  display: block;
  clear: both;
}
h5 {
  font-size: 1.1em;
  font-weight: 400;
  line-height: 1.4em;
  display: block;
  clear: both;
}
h6 {
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1.4em;
  display: block;
  clear: both;
}
p {
  font-size: 0.9em;
  font-weight: 400;
  line-height: 1.4em;
  display: block;
  clear: both;
  padding: 5px 0;
}
a,
.fake_link {
  display: inline-block;
  color: $light_green;
  word-break: break-word;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: none;
  }

  .icon {
    padding-right: 0.5em;
  }

  &.hover {
    text-decoration: none;
  }
}
small {
  font-size: 0.7em;
  font-weight: 400;
  line-height: 1.4;
}
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #f3f3f3;
  border-radius: 5px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #d9d9de;
  border-radius: 5px;
  border-top: 2px solid #fff;
}
.hover {
  opacity: 1;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.9;
  }

  &.active {
    opacity: 0.9;
  }
}
.bold {
  font-weight: 600;
}
.extra_bold {
  font-weight: bold;
}
.no_items_container {
  position: relative;
  width: 100%;
  padding: 25% 5%;
  text-align: center;
  opacity: 0.7;

  &.little_spacing {
    padding: 5%;
  }

  &.upper {
    padding: 15% 5%;
  }
  &.no_spacing {
    padding-top: 0;
  }
  &.middle_spacing {
    display: flex;
    height: 100%;
    padding: 0;
    justify-content: center;
    align-items: center;
  }

  h3 {
    font-weight: initial;
  }

  .icon {
    display: inline-block;
    padding-bottom: 12px;
    font-size: 3.25em;
  }
}
.error_header {
  padding: 18px 0;

  &:first-of-type {
    padding-top: 0;
  }
}
.error_button_wrapper {
  display: flex;
  padding-top: 24px;
  align-items: center;
  justify-content: center;

  .button_wrapper {
    padding: 0 12px;
  }
}

/*
 ___________  ___   _   _  _____ _____ _____ _____ _____ _   _  _____
|_   _| ___ \/ _ \ | \ | |/  ___|_   _|_   _|_   _|  _  | \ | |/  ___|
  | | | |_/ / /_\ \|  \| |\ `--.  | |   | |   | | | | | |  \| |\ `--.
  | | |    /|  _  || . ` | `--. \ | |   | |   | | | | | | . ` | `--. \
  | | | |\ \| | | || |\  |/\__/ /_| |_  | |  _| |_\ \_/ / |\  |/\__/ /
  \_/ \_| \_\_| |_/\_| \_/\____/ \___/  \_/  \___/ \___/\_| \_/\____/

*/

// FADE/MOVE DOWN

.fade-down-leave-active,
.fade-down-enter-active {
  transition: all 0.2s ease-in-out;
}
.fade-down-enter {
  bottom: -100% !important;
  opacity: 0;
}
.fade-down-leave-to {
  opacity: 0;
}

// FADE/MOVE UP

.fade-up-leave-active,
.fade-up-enter-active {
  transition: all 0.2s ease-in-out;
}
.fade-up-enter {
  top: 150px !important;
  opacity: 0;
}
.fade-up-leave-to {
  opacity: 0;
}

// FADE BOTH

.fade-both-enter-active,
.fade-both-leave-active {
  transition: opacity 0.25s;
}
.fade-both-enter,
.fade-both-leave-to {
  opacity: 0;
}

// FADE IN NOT OUT

.fade-in-not-out-enter-active {
  transition: opacity 0.25s;
}
.fade-in-not-out-enter {
  opacity: 0;
}

// FADE OUT NOT IN

.fade-out-not-in-leave-active {
  transition: opacity 0.25s;
}
.fade-out-not-in-leave-to {
  opacity: 0;
}

// MOVE UP

.move-up-enter-active,
.move-up-leave-active {
  transition: all 0.25s;
}
.move-up-enter {
  opacity: 0;
  transform: translateY(200px);
}
.move-up-leave-to {
  opacity: 0;
}

// MOVE DOWN

.move-down-enter-active {
  transition: all 0.5s linear;
  transition-delay: 100ms;
  transition-duration: 0;
}
.move-down-enter {
  opacity: 0;
  transform: translateY(-150%);
}

// MOVE UP NOT OUT

.move-up-not-out-enter-active {
  transition: all 0.35s;
}
.move-up-not-out-enter {
  opacity: 0;
  transform: translateY(400px);
}

// SLIDE RIGHT

.slide-right-leave-active,
.slide-right-enter-active {
  transition: transform 0.25s ease-in-out;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translate(125%, 0);
}

// TADA

.tada-enter-active {
  animation: tada 1s;
}

@keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

/*
 _     _____  ___ ______ ___________  _____
| |   |  _  |/ _ \|  _  \  ___| ___ \/  ___|
| |   | | | / /_\ \ | | | |__ | |_/ /\ `--.
| |   | | | |  _  | | | |  __||    /  `--. \
| |___\ \_/ / | | | |/ /| |___| |\ \ /\__/ /
\_____/\___/\_| |_/___/ \____/\_| \_|\____/

*/

#syn_loader_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: #44515b;
}

.syn_loader {
  position: relative;
  width: 20px;
  height: 20px;
  top: 46%;
  top: calc(50% - 6px);
  left: 46%;
  left: calc(50% - 6px);
  background-color: #e4e4e4;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-animation: syn_loader 1s ease-in-out infinite;
  animation: syn_loader 1s ease-in-out infinite;
}

.syn_loader:before {
  content: "";
  position: absolute;
  background-color: #e4e4e4;
  opacity: 0.4;
  top: 0px;
  left: -40px;
  height: 20px;
  width: 20px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

.syn_loader:after {
  content: "";
  position: absolute;
  background-color: #e4e4e4;
  opacity: 0.4;
  top: 0px;
  left: 40px;
  height: 20px;
  width: 20px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

@-webkit-keyframes syn_loader {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
  }
}

@keyframes syn_loader {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.loading_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
  width: 100%;
  background-color: inherit;
  overflow: hidden;
}
.passive_loading_container {
  position: absolute;
  right: 15px;
  top: 5px;
  z-index: 1;
  background-color: inherit;

  .small_loader {
    width: 40px;
    height: 40px;
    background-color: inherit;
  }
}
</style>
