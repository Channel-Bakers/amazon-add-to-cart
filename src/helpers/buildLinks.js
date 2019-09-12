import 'url-polyfill';

export default (url, id) => {
    try {
        url = new URL(url);

        if (url.searchParams.has('offeringID.1') && id !== undefined) {
            url.searchParams.set('session-id', id);
        }
        
        return url.href;
    } catch (_) {
        return undefined;
    }
};
