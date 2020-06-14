<template>
  <v-dialog v-model="show" @click:outside="cancel" max-width="500">
    <v-card>
      <v-card-title
        ><span class="title">{{ title }}</span></v-card-title
      >
      <v-card-text>
        <h4>{{ message }}</h4>
        <v-card-actions>
          <v-btn
            color="primary"
            outlined
            dark
            class="mb-2"
            width="50%"
            @click="cancel"
            >Batal</v-btn
          >
          <v-btn color="primary" dark class="mb-2" @click="confirm" width="50%"
            >Ya</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) this.$emit("cancel");
      }
    }
  }
};
</script>
