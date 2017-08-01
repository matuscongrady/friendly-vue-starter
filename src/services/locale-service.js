export const getCurrentUserLanguage = () =>
  ((navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage)
    .toLowerCase()
    .split(/[_-]+/)[0] || DEFAULT_LOCALE;
