async function loadConfig() {
  const theme = await import(`./theme.mjs`);
  if (new Date().getHours() < 18) {
    return theme.setLightTheme();
  }
  return theme.setDarkTheme();
}

loadConfig();
