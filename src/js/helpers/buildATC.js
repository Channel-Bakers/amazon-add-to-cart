'use strict';

import buildLink from './buildLink';
import isBuyBox from './isBuyBoxATC';
import isLinkedImage from './isLinkedImage';
import isCarouselATC from './isCarouselATC';
import buildBuyBox from './buildBuyBox';
import {addToCartInBackground, addToCartInNewWindow} from './addToCartActions';

export default async link => {
	if (isBuyBox(link)) {
		link = await buildBuyBox(link);
	} else if (!isLinkedImage(link) || !isCarouselATC(link)) {
		return;
	}

	let newLink = await buildLink(link, CB.sessionID || getCookie('session-id'), CB.offerings || []);

	if (newLink !== undefined) {
		let newNode = link.cloneNode(true);
		link.parentNode.replaceChild(newNode, link);
		newNode.href = newLink;
		newNode.classList.add('loaded');

		switch(CB.action) {
			case 'tab':
				newNode.setAttribute('target', '_blank');
				break;
			case 'window':
				newNode.addEventListener('click', () => {
					addToCartInNewWindow(newLink);
				});
				break;
			case 'background':
				newNode.addEventListener('click', () => {
					addToCartInBackground(newLink);
				});
				break;
			default:
				return;
		}
	}
};
