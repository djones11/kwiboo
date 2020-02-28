<template>
  <transition :name="fadeTransition">
    <div
      v-click-outside="hide"
      :class="`action_box ${$mq}`"
      v-if="visibility == true"
    >
      <!-- List type -->

      <template>
        <ul class="action_wrap">
          <li
            title=""
            v-for="(list_item, index) in availableListOptions"
            :key="list_item['id'].replace('{{index}}', index)"
            class="action_list_item"
            :style="list_item['style']"
          >
            <label
              class="action_list_item_inner_container"
              :class="{ active: list_item['class'] }"
              @click="
                $event.which == 1 && list_item['function']
                  ? clickEvent(list_item, $event, index)
                  : null
              "
            >
              <span
                v-if="list_item['icon']"
                :class="`icon ${list_item['icon']}`"
              ></span>            
              <span>{{ list_item["name"] }}</span>
            </label>
          </li>
        </ul>
        <ul class="action_wrap mobile_close_wrap" v-if="$mq != 'desktop'">
          <li
            class="action_list_item"
            @click="
              $event.stopPropagation();
              $emit('hide');
            "
          >
            <span class="action_list_item_inner_container">Close</span>
          </li>
        </ul>
      </template>
    </div>
  </transition>
</template>

<script>
import ClickOutside from "vue-click-outside";

import { mapGetters } from "vuex";

export default {
  name: "ActionBox",
  data: function() {
    return {};
  },
  props: {
    visibility: {
      required: true,
      type: Boolean
    },
    config: {
      type: Array | Object,
      default: () => []
    },
    fadeTransition: {
      type: String,
      default: "fade-up"
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  model: {
    prop: "output"
  },
  directives: {
    ClickOutside
  },
  computed: {
    availableListOptions() {
      return this.config.filter(x => {
        return typeof x["show"] == "undefined" || x["show"];
      });
    },
    outputFunction: {
      get() {
        return this.config["model"];
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    hide() {
      if (this.visibility) {
        this.$emit("hide");
      }
    },
    clickEvent(item, $event, index) {      
      item["function"]($event, item, index, this.params);
    }
  }
};
</script>

<style scoped lang="scss">
.action_box {
  position: absolute;
  top: calc(100% + 16px);
  z-index: 15;
  width: 250px;
  color: $normal_text_colour;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 13px -1px rgba(0, 0, 0, 0.5);
  user-select: none;
  will-change: top, opacity;
  transform: translateZ(0);

  &.top {
    top: auto;
    bottom: calc(100% + 16px);

    &:after {
      top: auto;
      bottom: -10px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-top: 5px solid #fff;
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: -5px;
    left: 22px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
  }
  &.none {
    &:after {
      border: transparent;
    }
  }
  &.right {
    right: 0;
    left: initial;

    &:after {
      left: auto;
      right: 15px;
    }
  }
  &.center {
    right: -30px;
    left: initial;
    transform: translateX(-50%);

    &:after {
      left: auto;
      right: 10px;
    }
  }
}
.action_wrap {
  height: auto;
  margin: 0 auto;
  padding: 6px 6px 4px 6px;
}
.action_list_item {
  position: relative;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  font-size: 15px;
  background-color: #fff;
  text-align: left;

  &:nth-child(1) {
    border: none;
  }
  .icon {
    display: flex;
    padding: 0px 15px 0 10px;
    align-items: center;
    font-size: 16px;
  }
  * {
    vertical-align: middle;
  }
}
.action_list_item_inner_container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: $pale_blue;
  }

  &.active {
    &:after {
      content: "\e906";
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
      font-family: "icomoon" !important;
    }
  }
}

/*
___  ___      _     _ _      
|  \/  |     | |   (_) |     
| .  . | ___ | |__  _| | ___ 
| |\/| |/ _ \| '_ \| | |/ _ \
| |  | | (_) | |_) | | |  __/
\_|  |_/\___/|_.__/|_|_|\___|
                             
*/

.tablet,
.mob {
  $child_list_item_height: 40px;

  .action_box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99999;
    width: 100% !important;
    max-height: 100% !important;
    margin: 0;
    padding-top: 75px;
    background-color: rgba(95, 109, 122, 0.75);
    transform: initial;
  }

  .action_wrap {
    width: 80%;
  }
  .action_list_item {
    text-align: center;
    font-size: 18px;

    .icon {
      display: none;
    }
  }

  .action_list_item_inner_container {
    padding: 14px 0;
    justify-content: center;
  }
}
</style>
