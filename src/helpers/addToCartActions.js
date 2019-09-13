export const addToCartInBackground = () => {
	event.preventDefault();

	let href = event.target.href;

	console.log(href);

	fetch(href)
		.then(response => {
			response.json()
		.then(data => {
			console.log(data);
			return false;
		});
	});
}

export const addToCartInNewWindow = () => {
	event.preventDefault();

	let href = event.target.href;

	console.log(href);

	if (window.innerWidth <= 640) {
        // if width is smaller then 640px, create a temporary a elm that will open the link in new tab
        var a = document.createElement('a');
        a.setAttribute('href', href);
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
        window.open(href , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
	}

    return false;
}
