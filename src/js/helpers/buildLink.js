import 'url-polyfill';
import {isEmpty} from './object';

/**
 * 
 */
export default async (a, sessionID, offerings = false) => {
    try {
        let url = new URL(a.href);

        // Add offeringID.1 parameter to Buy Box links
        if (offerings.length && a.hasAttribute('data-component-id')) {
            const COMPONENT_ID = a.getAttribute('data-component-id');
            const ASIN = COMPONENT_ID.split('_')[0];

            // Loop through the offerings object and find matching ASIN
            offerings.map(offering => {
                if (!isEmpty(offering)) {
                    if (offering.asin === ASIN) {
                        const OFFERING_ID = offering.offeringID;
        
                        url.href = 'https://www.amazon.com/gp/item-dispatch/';
                        url.searchParams.set('submit.addToCart', 'addToCart')
                        url.searchParams.set('offeringID.1', OFFERING_ID);
                    }
                }
            })
        }

        // Add session-id parameter to any link with an offeringID.1 parameter
        if (sessionID !== undefined) {
            if (url.searchParams.has('offeringID.1')) {
                url.searchParams.set('session-id', sessionID);
            } else {
                return a.href;
            }
        }
        
        return url.href;
    } catch (_) {
        return a.href;
    }
};
