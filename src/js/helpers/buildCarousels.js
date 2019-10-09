'use strict';

import buildLink from "./buildLink";
import attachEvents from "./attachEvents";

export default (carousels) => {
	carousels.forEach(carousel => {
		const ITEMS = carousel.querySelectorAll('.carousel-product-list-item');

		ITEMS.forEach(async item => {
			const ASIN = item.querySelector('div[data-asin]').getAttribute('data-asin');

			if (!item.querySelector('a[data-component-type="CarouselAddToCart"]')) {

				// There's no ATC button, let's build one.
				const ENTRY_POINT = item.querySelector('.lp-product-info-wrap').nextSibling;
				const PDP_LINK = item.querySelector('a[data-component-type="Carousel"]').href;
				const ATC_WRAPPER = document.createElement('div');
				const ATC_BTN = document.createElement('a');

				ATC_BTN.href = PDP_LINK;
				ATC_BTN.classList.add('dacx-a-reset');
				ATC_BTN.setAttribute('data-component-type', 'CarouselAddToCart');
				ATC_BTN.setAttribute('data-component-id', `${ASIN}_ATC`);
				ATC_BTN.innerHTML = `
					<span class="lp-button-wrap ">
						<span class="a-button a-button-beside-text a-button-primary">
							<span class="a-button-inner">
								<input type="submit" class="a-button-input">
								<span class="a-button-text a-text-center" aria-hidden="true">Add to Cart</span>
							</span>
						</span>
					</span>
				`;

				ATC_WRAPPER.append(ATC_BTN);
				ENTRY_POINT.append(ATC_WRAPPER);

				const NEW_LINK = await buildLink(ATC_BTN, CB.sessionID || getCookie('session-id'), CB.offerings || []);

				if (NEW_LINK !== ATC_BTN.href) {
					ATC_BTN.href = NEW_LINK;
					attachEvents(ATC_BTN);
				}
			}
		});
	});
};
