export const addToCartInBackground = link => {
    event.preventDefault();
    
    let loaderWrap = document.createElement('div'),
        loaderContent = document.createElement('div'),
        loader = document.createElement('div');

    loaderWrap.classList.add('loading-wrapper');
    loaderWrap.classList.add('is-loading');
    loaderContent.classList.add('loading-content');
    loader.classList.add('loading');

    loaderWrap.innerHTML = '<a class="loading-close">&times;</a>';
    loader.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/rdimascio/atc@1.4/assets/img/loader.svg" />';

    loaderContent.appendChild(loader);
    loaderWrap.appendChild(loaderContent);
    document.body.appendChild(loaderWrap);

	fetch(link)
		.then(response => {
			response.text()
		.then(() => {

            loaderWrap.classList.remove('is-loading');
            loaderWrap.classList.add('is-loaded');
            loader.innerHTML = `
                <a href="https://www.amazon.com/gp/cart/view.html">View Cart</a>
            `;

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
