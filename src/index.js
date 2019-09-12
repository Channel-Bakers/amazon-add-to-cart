import getCookie from './helpers/getCookie';
import buildLinks from './helpers/buildLinks';

(function() {
    const sessionID = getCookie('session-id');
    setTimeout(() => {
        let links = document.querySelectorAll('a');
        [...links].map(link => {
            let newLink = buildLinks(link.href, sessionID)
            
            if (newLink !== undefined) {
                link.href = newLink;
            } else {
                console.log(link.href);
            }

            link.addEventListener('click', () => {
                event.preventDefault();

                window.location.href = link.href;
            });
        });
    }, 1000);
}());
