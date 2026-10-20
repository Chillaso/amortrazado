// Prefixes a root-relative path with the site's base path (e.g. /amortrazado on GitHub Pages).
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
