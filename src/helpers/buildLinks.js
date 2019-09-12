import 'url-polyfill';

export default (a, sessionID, offerings = false) => {
    try {
        let url = new URL(a.href);

        if (offerings && a.hasAttribute('data-component-id')) {
            const COMPONENT_ID = a.getAttribute('data-component-id');

            if (COMPONENT_ID.includes('_')) {
                const ASIN = COMPONENT_ID.split('_')[0];

                if (offerings.hasOwnProperty(ASIN)) {
                    const OFFERING_ID = offerings[ASIN];

                    url.href = 'https://www.amazon.com/gp/item-dispatch/';
                    url.searchParams.set('submit.addToCart', 'addToCart')
                    url.searchParams.set('offeringID.1', OFFERING_ID);
                }
            }
        }

        if (sessionID !== undefined) {
            if (url.searchParams.has('offeringID.1')) {
                url.searchParams.set('session-id', sessionID);
            }
        }
        
        return url.href;
    } catch (_) {
        return undefined;
    }
};
