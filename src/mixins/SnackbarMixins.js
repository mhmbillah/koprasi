export default {
  data() {
    return {
      visibleSnackbar: false,
      snackbarText: "",
      snackbarColor: ""
    };
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.visibleSnackbar = true;
    }
  }
};
