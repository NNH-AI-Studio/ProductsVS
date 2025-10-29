export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = stored === 'system' || !stored ? systemPreference : stored;
        
        document.documentElement.classList.add(theme);
        document.documentElement.style.colorScheme = theme;
      } catch (e) {
        console.error('Theme initialization error:', e);
      }
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
