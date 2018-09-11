import {renderToString} from "react-dom/server";
import favicon from "../data/logo-black.svg";

export default ({body, title, preloadedState}) => {
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
			    
			    <!-- Global site tag (gtag.js) - Google Analytics -->
					<script async src="https://www.googletagmanager.com/gtag/js?id=UA-121723987-1"></script>
					<script>
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'UA-121723987-1');
					</script>
					
			    <script src="/bundle.js" defer></script>
	        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet"> 
	        <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"/>
			</head>
			<body>
				<div id="root">${body}</div>
				
				<script id="state">
					// WARNING: See the following for security issues around embedding JSON in HTML:
					// http://redux.js.org/recipes/ServerRendering.html#security-considerations
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\\\\\\\u003c')}
				</script>
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