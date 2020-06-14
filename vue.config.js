module.exports = {
  configureWebpack: {
    devServer: {
      proxy: "https://localhost:8090"
    }
  },
  transpileDependencies: ["vuetify"]
};
