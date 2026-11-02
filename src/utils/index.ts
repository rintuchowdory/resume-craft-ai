

export function createPageUrl(pageName: string) {
    return '/' + pageName.toLowerCase().replace(/ /g, '-');
}

/**
 * Absolute URL for full page reloads (window.location.href). React Router
 * already applies the app basename to <Link to>, but a raw location change
 * bypasses it, which breaks sub-path deployments such as GitHub Pages.
 */
export function createPageHref(pageName: string) {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const [path, ...query] = pageName.split('?');
    const normalized = path.toLowerCase().replace(/ /g, '-');
    return `${base}/${normalized}${query.length ? `?${query.join('?')}` : ''}`;
}
