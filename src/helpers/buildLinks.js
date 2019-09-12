import 'url-polyfill';

export default (a, sessionID, offerings = false) => {
    try {
        let url = new URL(a.href);

        if (sessionID !== undefined) {
            if (url.searchParams.has('offeringID.1')) {
                url.searchParams.set('session-id', sessionID);
            } else if (offerings) {
                const COMPONENT_ID = a.getAttribute('data-component-id');
                const ASIN = COMPONENT_ID.split('_')[0];

                if (offerings.hasOwnProperty(ASIN)) {
                    const OFFERING_ID = offerings[ASIN];

                    url.href = `https://www.amazon.com/gp/item-dispatch/?submit.addToCart=addToCart&offeringID.1=${OFFERING_ID}&session-id=${sessionID}`;
                }
            }
        }
        
        return url.href;
    } catch (_) {
        return undefined;
    }
};
