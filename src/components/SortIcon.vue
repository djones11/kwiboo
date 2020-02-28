<template functional>
  <div
    :title="data['attrs']['title']"
    class="sort_icon_container hover"
    @click="listeners.click(props.value)"
    :class="{
      active: props.active
    }"
  >
    <span
      v-if="props.icon.includes('icon')"
      :class="`icon ${props.icon}`"
    ></span>
    <span v-else class="letters">{{ props.icon }}</span>
    <span
      class="icon"
      :class="{
        'icon-caret-down': props.sortDir == 'desc' || !props.active,
        'icon-caret-up': props.sortDir == 'asc' && props.active
      }"
    >
    </span>
  </div>
</template>

<script>
export default {
  name: "SortIcon",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    sortDir: {
      type: String,
      default: "desc"
    },
    icon: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.sort_icon_container {
  display: flex;
  padding-right: 12px;
  align-items: center;
  font-size: 0.85em;

  &.active {
    color: $light_green;
  }
}
.letters {
  font-size: 0.75em;
  font-weight: 600;
}
.icon {
  display: inline-block;
  padding-left: 6px;

  &.icon-caret-down {
    position: relative;
    font-size: 0.85em;
  }

  &.icon-caret-up {
    position: relative;
    font-size: 0.85em;
  }
}
</style>
