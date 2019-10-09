/**
 * This is for products like Norton that don't generate ATC links on Buy Boxes
 */
export default async link => {
		
	// Add the attributes
	const ASIN = link.closest('div[data-asin]').getAttribute('data-asin');

	link.setAttribute('data-component-id', ASIN);
	link.setAttribute('data-component-type', 'BuyBoxAddToCart');

	// Add the cart icon
	link.querySelector('.a-button').classList.add('a-button-icon');
	link.querySelector('.a-button-inner').prepend('<i class="a-icon a-icon-cart"></i>');

	// Change the button text
	link.querySelector('.a-button-text').innerHTML = 'Add to Cart';

	return link;
};
