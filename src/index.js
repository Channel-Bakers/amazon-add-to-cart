import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';
import {addToCartInBackground, addToCartInNewWindow} from './helpers/addToCartActions';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    const buildElements = (links) => {
        [...links].map(link => {
            let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), CB.offerings || []);

            if (newLink !== undefined) {
                let newNode = link.cloneNode(true);
                link.parentNode.replaceChild(newNode, link);
                newNode.href = newLink;

                switch(CB.action) {
                    case 'tab':
                        newNode.setAttribute('target', '_blank');
                        break;
                    case 'window':
                        newNode.addEventListener('click', () => {
                            addToCartInNewWindow(newLink);
                        });
                        break;
                    case 'background':
                        newNode.addEventListener('click', () => {
                            addToCartInBackground(newLink);
                        });
                        break;
                    default:
                        return;
                }
            }
        });
    };

    CB.init = () => {
        const LINKS = document.querySelectorAll('a');
        const HOT_SPOTS = document.querySelectorAll('div[class*="-lp-Hotspot"]');

        buildElements(LINKS);

        [...HOT_SPOTS].map(hotspot => {
            hotspot.addEventListener('click', () => {
                setTimeout(() => {
                    const MODALS = document.querySelectorAll('div[class*="-lp-Modal"]');

                    [...MODALS].map(modal => {
                        const LINKS = modal.querySelectorAll('a');

                        buildElements(LINKS);
                    })
                }, 500);
            })
        });
    }
}());
