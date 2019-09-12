import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    CB.buildLinks = (offerings = false) => {
        setTimeout(() => {
            const LINKS = document.querySelectorAll('a');

            [...LINKS].map(link => {
                let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), offerings);
                
                if (newLink !== undefined) {
                    let newNode = link.cloneNode(true);
                    link.parentNode.replaceChild(newNode, link);
                    newNode.href = newLink;
                }
            });

            const HOT_SPOTS = document.querySelectorAll('div[class*="-lp-Hotspot"]');

            [...HOT_SPOTS].map(hotspot => {
                hotspot.addEventListener('click', () => {
                    console.log('Hotspot clicked');
                    setTimeout(() => {
                        const MODALS = document.querySelectorAll('div[class*="-lp-Modal"]');

                        [...MODALS].map(modal => {
                            const LINKS = modal.querySelectorAll('a');

                            [...LINKS].map(link => {
                                let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), offerings);

                                if (newLink !== undefined) {
                                    let newNode = link.cloneNode(true);
                                    link.parentNode.replaceChild(newNode, link);
                                    newNode.href = newLink;
                                }
                            });
                        })
                    }, 500);
                })
            });

        }, 1000);
    }
}());
