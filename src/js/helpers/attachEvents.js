'use strict';

import {addToCartInBackground, addToCartInNewWindow} from './addToCartActions';

export default (link) => {
	let newNode = link.cloneNode(true);

	link.parentNode.replaceChild(newNode, link);
	newNode.classList.add('loaded');

	switch(CB.action) {
		case 'tab':
			newNode.setAttribute('target', '_blank');
			break;
		case 'window':
			newNode.addEventListener('click', () => {
				addToCartInNewWindow(link);
			});
			break;
		case 'background':
			newNode.addEventListener('click', () => {
				addToCartInBackground(link);
			});
			break;
		default:
			return;
	}
};
