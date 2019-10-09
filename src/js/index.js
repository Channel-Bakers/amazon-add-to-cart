import getCookie from './helpers/getCookie';
import buildATC from './helpers/buildATC';
import buildCarousels from './helpers/buildCarousels';
import '../scss/main.scss';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    CB.init = () => {
        const CAROUSELS = document.querySelectorAll('.carousel-wrap');
        buildCarousels(CAROUSELS);

        const handleIntersection = (entries, OBSERVER) => {
            entries.forEach(async entry => {
                if (entry.intersectionRatio > 0 && !entry.target.classList.contains('loaded')) {
                    let img = entry.target.querySelector('img');

                    if (img) {
                        if (img.getAttribute('src')) {
                            await buildATC(entry.target);
                        }
                    } else {
                        await buildATC(entry.target);
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
