// Prefixes a root-relative path with the site's base path. The site has none now (it lives at the
// root of amortrazado.com), so this returns the path as it is; it stays in case `base` is set again.
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
