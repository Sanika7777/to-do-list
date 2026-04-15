import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});