<template functional>
  <div
    class="button_wrapper"
    :class="[
      data.staticClass,
      data.class
    ]"
    :title="props.title"
  >
    <div
      class="button_container"
      @click="listeners.click"
      :style="[data.staticStyle, data.style]"
      :class="{
        disabled: props.disabled
      }"
    >
      <button
        tabindex="-1"
        class="button"
        v-html="props.buttonText"
        :disabled="props.disabled"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.button_wrapper {
  display: inline-block;
  user-select: none;
}
.button_container {
  position: relative;
  display: flex;
  width: auto;
  margin: 0 auto;
  padding: 0.25em 1.25em;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 0.9em;
  line-height: 1.2em;
  border: 3px solid $dark_blue;
  background-color: $dark_blue;
  opacity: 0.8;
  outline: none;
  border-radius: 24px;
  overflow: hidden;
  transition: all 100ms ease-in-out;

  &.disabled {
    opacity: 0.35;
  }
  & > * {
    vertical-align: middle;
  }
  &:not(.disabled) {
    cursor: pointer;

    & * {
      cursor: pointer;
    }

    &:hover {
      opacity: 1;
    }
  }
}
.button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: inherit;
  font-size: inherit;

  & /deep/ .icon-cross2 {
    padding: 2px 0 0 6px;
  }

  & /deep/ .icon {
    padding-left: 6px;
  }
}
</style>
