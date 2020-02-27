<template>
  <div class="animal_wrapper">
    <!-- Animal selector -->

    <div class="animal_selection_wrapper">
      <h3 class="animal_selection_header">Click to add an animal</h3>
      <div class="animal_selection_container">
        <div 
          v-for="(icon, type) in animalTypes" 
          :key="type" 
          class="animal_section_item hover"
          @click="animals.push(animalFactory(type))"
        >
          <span :class="`icon ${icon}`"></span>
        </div>
      </div>
    </div>

    <!-- Filter container -->

    <div class="filter_wrapper">
    </div>

    <!-- Current animals -->

    <div class="animal_item_container">
      <AnimalItem 
        v-for="animal in animals" 
        :key="animal['id']" 
        :animalClass="animal" 
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import animalClasses from "@/mixins/animalClasses";
import AnimalItem from "./AnimalItem";

export default {
  data: function() {
    return {
      animalTypes: {
        dog: "icon-dog",
        cat: "icon-cat",
        bird: "icon-dove"
      },
      animals: []
    };
  },
  components: { AnimalItem },
  mixins: [animalClasses],
  methods: {},
  computed: {
    ...mapGetters(["getLanguage"])
  }
};
</script>

<style scoped lang="scss">

$side_padding: 12px;

.animal_wrapper {
  display: flex;
  max-width: 1000px;
  width: 100%;  
  height: 100%;
  margin: auto;
  padding: 24px 8px;
  flex-direction: column;
  background-color: inherit;
}
.animal_selection_container {
  display: flex;
  padding: 0 $side_padding;
  justify-content: space-between;
}
.animal_selection_header {
  padding: 32px 0;
  color: $light_text_colour;
  text-align: center;
}
.filter_wrapper {
  padding: 24px $side_padding;
}
.animal_section_item {
  display: flex;
  padding: 1.25em;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 2.25em;
  background-color: $light_grey;
  border-radius: 12px;

  &:not(:first-child) {
    margin-left: 6px;
  }

  &:not(:last-child) {
    margin-right: 6px;
  }
}
.animal_item_container {
  display: flex;
  width: 100%;
  padding: 0 $side_padding;
  flex-wrap: wrap;
  background-color: inherit;
  overflow: auto;
}
</style>