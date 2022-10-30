/**
 * rows per page
 */
export function setRowsPerPageInLS(rowsPerPage: string) {
  localStorage.setItem('rowsPerPage', rowsPerPage);
}

/**
 * language
 */
export function setLanguageInLS(language: string) {
  localStorage.setItem('language', language);
}

/**
 * dark mode
 */
export function setDarkModeInLS(isDarkMode: string) {
  localStorage.setItem('isDarkMode', isDarkMode);
}
