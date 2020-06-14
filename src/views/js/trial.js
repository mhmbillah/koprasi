import { mapActions } from "vuex";

export default {
  name: "Trial",
  data() {
    return {
      results: null
    };
  },
  methods: {
    ...mapActions("category", ["get"]),
    fetch() {
      this.get({
        success: this.handlesuccess,
        fail: this.handlefail
      });
    },
    handlesuccess(response) {
      const { data } = response;
      const { content } = data;
      this.results = content;
    },
    handlefail() {
      console.log("FAILED");
    }
  },
  mounted() {
    this.fetch();
  }
};
