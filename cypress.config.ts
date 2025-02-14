const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents() {
      // Adicione seus eventos aqui
    },
    // baseUrl: 'src/index.html', // descomente se necessário
    // supportFile: "cypress/support/e2e.ts", // descomente se necessário
  },
  video: true,
});
