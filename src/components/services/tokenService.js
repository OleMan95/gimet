/**
 * TOKENS:
 * aat - must be in every request to the back-end;
 * at - authorization token;
 *
 */
export function getToken(){
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + 'at'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}