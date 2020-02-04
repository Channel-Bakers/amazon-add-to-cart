'use strict'

import buildLink from './buildLink'
import isBuyBox from './isBuyBoxATC'
import isLinkedImage from './isLinkedImage'
import buildBuyBox from './buildBuyBox'
import attachEvents from './attachEvents'

export default async (link) => {
	if (isBuyBox(link)) {
		link = await buildBuyBox(link)
	} else if (!isLinkedImage(link)) {
		return
	}

	let newLink = await buildLink(
		link,
		CB.sessionID || getCookie('session-id'),
		CB.offerings || []
	)

	if (newLink !== link.href) {
		link.href = newLink
		attachEvents(link)
	}
}
