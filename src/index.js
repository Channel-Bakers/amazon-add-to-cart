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
                let newLink = buildLinks(link, CB.sessionID || getCookie('session-id'), offerings)
                
                if (newLink !== undefined) {
                    let newNode = link.cloneNode(true);
                    link.parentNode.replaceChild(newNode, link);
                    newNode.href = newLink;
                }
            });
        }, 1000);
    }
}());
