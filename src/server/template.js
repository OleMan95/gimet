import {renderToString} from "react-dom/server";
import favicon from "../data/logo-black.svg";

export default ({footer, body, title }) => {
	return `
    <!DOCTYPE html>
		<!--─────█─▄▀█──█▀▄─█─────-->
		<!--────▐▌──────────▐▌────-->
		<!--────█▌▀▄──▄▄──▄▀▐█────-->
		<!--───▐██──▀▀──▀▀──██▌───-->
		<!--──▄████▄──▐▌──▄████▄──-->
		<!--Aha! So you know how to open source code?-->
		<html lang="en">
			<head>
			    <meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			    <title>${title}</title>
			    <link rel="shortcut icon" href="${favicon}">
			    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
			    <link rel="stylesheet" href="/css/main.css"/>
			    <script src="/bundle.js" defer></script>
	        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
	        <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"/>
			</head>
			<body>
				<div id="root">${body}</div>
				${footer}
			</body>
			<!--───▄▄▄-->
			<!--─▄▀░▄░▀▄-->
			<!--─█░█▄▀░█-->
			<!--─█░▀▄▄▀█▄█▄▀-->
			<!--▄▄█▄▄▄▄███▀-->
			<!--Come on! Aren't you bored yet?-->
		</html>
  `;
};