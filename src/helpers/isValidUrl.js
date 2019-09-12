import 'url-polyfill';

export default (string) => {
	try {
		new URL(string);
		return true;
	} catch (_) {
		return false;
	}
};
