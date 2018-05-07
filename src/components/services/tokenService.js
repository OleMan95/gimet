/**
 * TOKENS:
 * aat - should be in every request to the back-end;
 * token - authorization token;
 *
 */
export function getToken(){
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + 'at'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}