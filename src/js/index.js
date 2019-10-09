import getCookie from './helpers/getCookie';
import buildLink from './helpers/buildLink';
import isBuyBox from './helpers/isBuyBoxATC';
import isLinkedImage from './helpers/isLinkedImage';
import buildBuyBox from './helpers/buildBuyBox';
import {addToCartInBackground, addToCartInNewWindow} from './helpers/addToCartActions';
import '../scss/main.scss';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    const buildElement = async link => {
        if (isBuyBox(link)) {
            link = await buildBuyBox(link);
        } else if (!isLinkedImage(link)) {
            return;
        }

        let newLink = await buildLink(link, CB.sessionID || getCookie('session-id'), CB.offerings || []);

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
    };

    CB.init = () => {
        const handleIntersection = (entries, OBSERVER) => {
            entries.forEach(async entry => {
                if (entry.intersectionRatio > 0 && !entry.target.classList.contains('loaded')) {
                    let img = entry.target.querySelector('img');

                    if (img) {
                        if (img.getAttribute('src')) {
                            await buildElement(entry.target);
                        }
                    } else {
                        await buildElement(entry.target);
                    }
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
