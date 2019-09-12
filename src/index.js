import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';

(function() {
    let CB = {};
    window.CB = CB;
    CB.sessionID = getCookie('session-id');

    CB.buildLinks = (offerings = false) => {
        setTimeout(() => {
            let links = document.querySelectorAll('a');

            [...links].map(link => {
                let oldNode = link;
                let newNode = link.cloneNode(true);

                let newLink = buildLinks(newNode, CB.sessionID || getCookie('session-id'), offerings)
                
                if (newLink !== undefined) {
                    link.parentNode.replaceChild(newNode, oldNode);
                }
            });
        }, 1000);
    }
}());
