'use strict';

import isBuyBox from './isBuyBoxATC';

export const addToCartInBackground = link => {
    event.preventDefault();

    const TARGET = event.target.closest('a');
    const LOADER_ICON = '<img src="https://cdn.jsdelivr.net/gh/rdimascio/atc@1.6.3/assets/img/loading.svg" />';
    const LOADED_ICON = '<img src="https://cdn.jsdelivr.net/gh/rdimascio/atc@1.6.3/assets/img/loaded.svg" />';

    if (!isBuyBox(link)) {
        let loaderWrap = document.createElement('div')
            , loaderContent = document.createElement('div')
            , loader = document.createElement('div');

        loaderWrap.classList.add('loading-wrapper');
        loaderWrap.classList.add('is-loading');
        loaderContent.classList.add('loading-content');
        loader.classList.add('loading');

        loader.innerHTML = LOADER_ICON;

        loaderContent.appendChild(loader);
        loaderWrap.appendChild(loaderContent);
        document.body.appendChild(loaderWrap);
    } else {
        let loader = document.createElement('div');
        loader.classList.add('buy-box-loading');
        loader.innerHTML = LOADER_ICON;

        TARGET.innerHTML = '';
        TARGET.appendChild(loader);
    }

	fetch(link)
		.then(response => {
			response.text()
		.then(() => {

            if (!isBuyBox(link)) {
                const LOADER_WRAP = document.querySelector('.loading-wrapper');
                const LOADER = document.querySelector('.loading');

                LOADER_WRAP.classList.remove('is-loading');
                LOADER_WRAP.classList.add('is-loaded');

                LOADER.innerHTML = LOADED_ICON;
                LOADER.innerHTML += '<h4>Added to Cart</h4>';

                setTimeout(() => {
                    LOADER_WRAP.outerHTML = '';
                }, 1000);
            } else {
                let loaded = document.createElement('div');
                loaded.classList.add('buy-box-loaded');
                loaded.innerHTML = LOADED_ICON;
                loaded.innerHTML += '<h4>Added to Cart</h4>';
                TARGET.closest('div').appendChild(loaded);
                TARGET.outerHTML = '';
            }

			return false;
		});
	});
}

export const addToCartInNewWindow = link => {
	event.preventDefault();

	if (window.innerWidth <= 640) {
        // if width is smaller then 640px, create a temporary a elm that will open the link in new tab
        var a = document.createElement('a');
        a.setAttribute('href', link);
        a.setAttribute('target', '_blank');

        var dispatch = document.createEvent('HTMLEvents');
        dispatch.initEvent('click', true, true);

        a.dispatchEvent(dispatch);
    }
    else {
        var width = window.innerWidth * 0.66 ;
        // define the height in
        var height = width * window.innerHeight / window.innerWidth ;
        // Ratio the hight to the width as the user screen ratio
        window.open(link , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
	}

    return false;
}
