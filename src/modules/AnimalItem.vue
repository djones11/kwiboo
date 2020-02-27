<template>
  <div class="animal_item_wrapper">
    <div class="animal_item_container">
      <span :class="`icon ${animalClass['icon']}`"></span>
      {{animalClass["name"]}}
      <div class="speak_container hover" @click="animalClass.speak()">
        Speak
        <span class="icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {};
  },
  props: {
    animalClass: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  computed: {
    ...mapGetters(["getLanguage"])
  }
};
</script>

<style scoped lang="scss">
  .animal_item_wrapper {
    display: flex;
    height: 400px;
    padding: 4px 0;
    align-items: center;
    flex: 0 0 calc(100% / 3);    

    &:nth-child(3n + 2):not(.small) {
      padding: 4px 8px;
    }
  }
  .animal_item_container {
    width: 100%;
    height: 100%;
    padding: 12px;
    background-color: $light_grey;
    border-radius: 12px;
  }
</style>