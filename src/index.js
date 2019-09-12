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
                    link.href = newLink;
                }

                link.removeEventListener('click');
    
                link.addEventListener('click', () => {
                    event.preventDefault();
    
                    window.location.href = link.href;
                });
            });
        }, 1000);
    }
}());
