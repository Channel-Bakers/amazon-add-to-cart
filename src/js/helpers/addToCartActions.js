export const addToCartInBackground = link => {
    event.preventDefault();

    const TARGET = event.target.closest('a');
    const IS_BUY_BOX = TARGET.getAttribute('data-component-type') === 'BuyBoxAddToCart';

    let loaderIcon= document.createElement('img');
    loaderIcon.src = 'https://cdn.jsdelivr.net/gh/rdimascio/atc@1.5/assets/img/loading.svg';

    let loadedIcon = document.createElement('img');
    loadedIcon.src = 'https://cdn.jsdelivr.net/gh/rdimascio/atc@1.5/assets/img/loaded.svg';

    if (!IS_BUY_BOX) {
        let loaderWrap = document.createElement('div'),
            loaderContent = document.createElement('div'),
            loader = document.createElement('div');

        loaderWrap.classList.add('loading-wrapper');
        loaderWrap.classList.add('is-loading');
        loaderContent.classList.add('loading-content');
        loader.classList.add('loading');

        loaderWrap.innerHTML = '<a class="loading-close">&times;</a>';
        loader.appendChild(loaderIcon);

        loaderContent.appendChild(loader);
        loaderWrap.appendChild(loaderContent);
        document.body.appendChild(loaderWrap);
    } else {
        let loader = document.createElement('div');
        loader.classList.add('buy-box-loading');
        TARGET.outerHTML = '';
        TARGET.appendChild(loaderIcon);
    }

	fetch(link)
		.then(response => {
			response.text()
		.then(() => {

            if (!IS_BUY_BOX) {
                const LOADER_WRAP = document.querySelector('loading-wrapper');
                const LOADER = document.querySelector('loading');

                LOADER_WRAP.classList.remove('is-loading');
                LOADER_WRAP.classList.add('is-loaded');

                LOADER.innerHTML = '';
                LOADER.appendChild(loadedIcon);
                LOADER.innerHTML += '<p>Added to Cart</p>';
                LOADER.innerHTML += '<a href="https://www.amazon.com/gp/cart/view.html">View Cart</a>';
            } else {
                let loaded = document.createElement('div');
                loaded.classList.add('buy-box-loaded');
                loaded.appendChild(loadedIcon);
                TARGET.outerHTML = '';
                TARGET.appendChild(loaded);
                TARGET.innerHTML += '<p>Added to Cart</p>';
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
