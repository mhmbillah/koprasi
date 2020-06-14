<template>
  <v-snackbar :timeout="timeout" top :color="color" v-model="visibleSnackbar">
    {{ text }}
    <slot></slot>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "info"
    },
    timeout: {
      type: Number,
      default: 3000
    },
    model: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleSnackbar: {
      get() {
        return this.model;
      },
      set(value) {
        if (!value) this.$emit("close");
      }
    }
  }
};
</script>
