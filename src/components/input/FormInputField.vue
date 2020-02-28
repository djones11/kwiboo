<template>
  <div class="form_input_container">
    <div class="input_wrapper">

      <!-- Text box -->

      <input
        :id="$vnode.key ? $vnode.key : msg"
        :type="newType == undefined ? 'text' : newType"
        v-model="outputFunction"
        :placeholder="msg"
        class="form_input form_input_text"
        :class="{
          empty: outputFunction.length == 0
        }"
      />
      <span
        title="Clear input"
        class="clear_field icon icon-close hover"
        @click="clearInput()"
        v-if="clear == true"
        v-show="outputFunction && outputFunction.length > 0"
      ></span>
    </div>
  </div>
</template>

<script>

export default {
  name: "FormInputField",
  data: function() {
    return {
      newType: this.type,
      newOutput: this.output,
      debounceTimeout: null
    };
  },
  props: {
    msg: String,
    type: {
      type: String,
      default: "text"
    },
    output: String | Object,
    debounce: {
      type: Number,
      default: 0
    },
    clear: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "output"
  },
  computed: {
    identifier() {
      return Math.random() + "_" + this.msg;
    },
    outputFunction: {
      get() {
        return (this.newOutput = this.output);
      },
      set(val) {
        this.updateOutput(val);
      }
    }
  },
  methods: {
    updateOutput(val) {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        if (this.validateConfig) {
          this.validator(val, this.validateConfig);
        }

        this.newOutput = val;
        this.$emit("input", val);
      }, this.debounce);
    },
    clearInput: function() {
      this.newOutput = "";
      this.$emit("input", this.newOutput);
    }
  }
};
</script>

<style scoped lang="scss">
.form_input_container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px 0;
}
.input_wrapper {
  position: relative;
  height: 100%;

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(calc(-50% + 0.1em));
    cursor: pointer;
  }
}
.form_input {
  width: 100%;
  outline: none;
  background: none;
  font-size: 1em;
  color: inherit;
  transition: padding 0.15s ease-in-out;
}

// Classic theme

.classic {
  color: $light_text_colour;

  .form_input::-webkit-input-placeholder {
    color: $light_text_colour;
  }
  .form_input:-moz-placeholder {
    color: $light_text_colour;
  }
  .form_input::-moz-placeholder {
    color: $light_text_colour;
  }
  .form_input:-ms-input-placeholder {
    color: $light_text_colour;
  }
  .form_input {
    display: block;
    width: 100%;
    padding: 0.3em 1em;
    clear: both;
    outline: none;
    background-color: transparent;    
    font-size: 1em;
    border: 2px solid $very_light_blue;
    border-radius: 30px;

    &.empty {
      background-color: rgba(255, 255, 255, 0.05);
    }

    &:focus {
      border-color: $light_green;
    }
  }

  .input_wrapper .clear_field {
    right: 1em;
  }
}
</style>
