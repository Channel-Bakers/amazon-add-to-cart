import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    const replaceElements = (links, offerings) => {
        [...links].map(link => {
            let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), offerings);

            if (newLink !== undefined) {
                let newNode = link.cloneNode(true);
                link.parentNode.replaceChild(newNode, link);
                newNode.href = newLink;
            }
        });
    };

    CB.init = (offerings = false) => {
        const LINKS = document.querySelectorAll('a');
        const HOT_SPOTS = document.querySelectorAll('div[class*="-lp-Hotspot"]');

        replaceElements(LINKS, offerings);

        [...HOT_SPOTS].map(hotspot => {
            hotspot.addEventListener('click', () => {
                setTimeout(() => {
                    const MODALS = document.querySelectorAll('div[class*="-lp-Modal"]');

                    [...MODALS].map(modal => {
                        const LINKS = modal.querySelectorAll('a');

                        replaceElements(LINKS, offerings);
                    })
                }, 500);
            })
        });
    }
}());
