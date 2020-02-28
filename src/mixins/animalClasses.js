
import { mapGetters } from "vuex";

import names from "@/stubs/names.json";

import cat1 from "@/sounds/cat1.mp3";
import cat2 from "@/sounds/cat2.mp3";
import cat3 from "@/sounds/cat3.mp3";

import dog1 from "@/sounds/dog1.mp3";
import dog2 from "@/sounds/dog2.mp3";
import dog3 from "@/sounds/dog3.mp3";

import bird1 from "@/sounds/bird1.mp3";
import bird2 from "@/sounds/bird2.mp3";
import bird3 from "@/sounds/bird3.mp3";

const nameLength = names.length;

export default {
  methods: {
    animalFactory(type, ...params) {

    // Generates animal classes and ensures only valid animal types can be created

      const availableAnimals = {
        dog: this.getDog,
        cat: this.getCat,
        bird: this.getBird,
      }

      if(availableAnimals.hasOwnProperty(type)) {
        return new availableAnimals[type](...params);
      } else {
        console.warn(`${type} is not a valid animal class type`);
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(["getLanguage"]),    
    getAnimal() {
      return class Animal {
        constructor() {
          this.name = names[Math.floor(Math.random() * nameLength)];
          this.id = Math.random() + new Date().getTime();
          this.creation = new Date().getTime();
        }

        speak() {
          if(this.hasOwnProperty("sounds")) {
            this.sounds[Math.floor(Math.random() * this.sounds.length)].play(0);
          }
        }
      }
    },
    getMammal() {
      let vue = this;

      return class Mammal extends vue.getAnimal {
        constructor() {
          super();

          this.isMammal = true;
        }
      }
    },
    getCat() {
      let vue = this;

      return class Cat extends vue.getMammal {
        constructor() {
          super();

          this.type = vue.getLanguage["cat"];
          this.icon = "icon-cat";
          this.sounds = [
            new Audio(cat1),
            new Audio(cat2),
            new Audio(cat3)
          ]
        }
      }
    },
    getDog() {
      let vue = this;

      return class Dog extends vue.getMammal {
        constructor() {
          super();

          this.type = vue.getLanguage["dog"];
          this.icon = "icon-dog";
          this.sounds = [
            new Audio(dog1),
            new Audio(dog2),
            new Audio(dog3)
          ]
        }
      }
    },
    getBird() {
      let vue = this;

      return class Bird extends vue.getMammal {
        constructor() {
          super();

          this.type = vue.getLanguage["bird"];
          this.icon = "icon-dove";
          this.sounds = [
            new Audio(bird1),
            new Audio(bird2),
            new Audio(bird3)
          ]
        }
      }
    }    
  }
};
