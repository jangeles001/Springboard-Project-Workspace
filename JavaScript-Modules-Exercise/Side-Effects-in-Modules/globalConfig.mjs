const config = {
  env: "development",
  debug: true,
  api: {
    baseURL: "https://api.example.com",
    timeout: 5000,
  },
  theme: {
    default: "light",
    autoSwitch: true,
  },
  paths: {
    logs: "./logs",
    assets: "./public/assets",
  },
  features: {
    enableBetaFeatures: false,
    useNewUI: true,
  },
};

console.log(config);

export default config;
