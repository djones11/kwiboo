<template>
  <div :class="`filter_wrapper ${localSizeClass}`">
    <div 
      class="filter_input" 
      @click="toggleActionBox($event, 'showOptions')"    
      :class="{
        active: showActionBox['showOptions']
      }"
    >
      <input
        v-if="
          localSizeClass == 'local_desktop' ||
            localSizeClass == 'desktop' ||
            localSizeClass == 'tablet'
        "
        disabled="disabled"
        class="filter_input_text"
        v-model="displayText"
        :class="{
          empty: currentlySelected == emptyValue
        }"
      />
      <div class="icon_container">
        <span :class="`icon filter_input_icon ${icon}`"></span>
      </div>
    </div>
    <ActionBox
      :visibility="showActionBox['showOptions']"
      key="showOptions"
      class="right"
      :config="options"
      @hide="hideActionBox"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import ClickOutside from "vue-click-outside";

import FormInputField from "@/components/input/FormInputField.vue";
import ActionBox from "@/components/ActionBox";

import actionBoxEvents from "@/mixins/actionBoxEvents.js";

export default {
  name: "MetricsFilterSelectBox",
  data: function() {
    return {
      displayText: "",
      showActionBox: {
        showOptions: false
      },
      currentlySelected: ""
    };
  },
  props: {
    type: {
      type: String,
      default: "date"
    },
    setDefault: String | Number,
    icon: {
      type: String,
      default: "icon-calendar4"
    },
    inputOptions: Object,
    localSizeClass: {
      type: String,
      default: "local_desktop"
    },
    active: {
      type: String | Number
    },
    emptyValue: {
      type: String
    }
  },
  directives: {
    ClickOutside
  },
  components: { FormInputField, ActionBox },
  mixins: [actionBoxEvents],
  computed: {
    options() {
      let options = [];

      for (let property in this.inputOptions) {
        options.push({
          name: this.inputOptions[property],
          id: property,
          class: this.currentlySelected == property ? true : false,
          function: event => {
            event.stopPropagation();

            this.displayText = this.inputOptions[property];
            this.$emit("click", property);

            this.currentlySelected = property;
          }
        });
      }

      return options;
    }
  },
  methods: {
    openDatePickerOptions($event) {
      if (this.options.length > 1) {
        this.toggleActionBox($event, "showOptions");
      } else {
        this.showDatePicker = true;
      }
    },
    closeDatePicker() {
      this.showDatePicker = false;
    }
  },
  watch: {
    setDefault: {
      immediate: true,
      handler(newval) {
        if (this.inputOptions) {
          this.displayText = this.inputOptions[newval]
            ? this.inputOptions[newval]
            : this.inputOptions["0"];

          this.currentlySelected = this.inputOptions[newval] ? newval : 0;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.filter_wrapper {
  position: relative;
}
.filter_input {
  display: flex;
  width: 275px;
  height: 2.2em;
  padding: 2px;
  align-items: center;
  background-color: $very_light_blue;
  border-radius: 40px;
  cursor: pointer;

  &.active {
    background-color: $light_green;
  }
}
.filter_input_text {
  height: 100%;
  margin: 0;
  padding: 0 1em;
  flex: 1;
  font-size: 0.9em;
  background-color: $very_dark_blue;
  border-radius: 40px;
  color: $light_text_colour;
  cursor: pointer;

  &.empty {
    background-color: rgb(77, 89, 99);
  }
}
.icon_container {
  display: flex;
  height: 100%;
  padding: 0 0.75em 0 0.65em;
  align-items: center;
}
.filter_input_icon {
  position: relative;
  font-size: 1.2em;
  color: $very_dark_blue;
}

/* 
  ___  ______________ _____ _      _____ 
  |  \/  |  _  | ___ \_   _| |    |  ___|
  | .  . | | | | |_/ / | | | |    | |__  
  | |\/| | | | | ___ \ | | | |    |  __| 
  | |  | \ \_/ / |_/ /_| |_| |____| |___ 
  \_|  |_/\___/\____/ \___/\_____/\____/ 
                                        
*/

.filter_wrapper {
  &.local_mob,
  &.mob {
    .filter_input {
      width: auto;
      border-radius: 50%;
      padding: 21px 0;
      text-align: center;
    }

    .icon_container {
      padding: 0 0.65em;
    }
  }
}
</style>
