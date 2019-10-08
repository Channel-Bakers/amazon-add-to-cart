import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';
import {addToCartInBackground, addToCartInNewWindow} from './helpers/addToCartActions';
import '../scss/main.scss';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    const buildElement = link => {
        // [...links].map(link => {
            let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), CB.offerings || []);

            if (newLink !== undefined) {
                let newNode = link.cloneNode(true);
                link.parentNode.replaceChild(newNode, link);
                newNode.href = newLink;
                newNode.classList.add('loaded');

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
        // });
    };

    CB.init = () => {
        const handleIntersection = (entries, OBSERVER) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    if (entry.target.querySelector('img').getAttribute('src') && !entry.target.classList.contains('loaded'))
                        buildElement(entry.target);
                }
            });
        };

        const OBSERVER_OPTIONS = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const OBSERVER = new IntersectionObserver(handleIntersection, OBSERVER_OPTIONS);

        const LINKS = document.querySelectorAll('a');

        LINKS.forEach(link => {
            OBSERVER.observe(link);
        });

        // const HOT_SPOTS = document.querySelectorAll('div[class*="-lp-Hotspot"]');

        // HOT_SPOTS.map(hotspot => {
        //     hotspot.addEventListener('click', () => {
        //         setTimeout(() => {
        //             const MODALS = document.querySelectorAll('div[class*="-lp-Modal"]');

        //             MODALS.map(modal => {
        //                 const LINKS = modal.querySelectorAll('a');

        //                 buildElements(LINKS);
        //             })
        //         }, 500);
        //     })
        // });
    }
}());
