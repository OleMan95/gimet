import React, { Component } from 'react';
import './index.scss';

class Header extends Component {

	render() {
		return (
			<footer className="Footer bg-dark">
				<p>Authors:</p>
				<a href="/">Oleksii Manachynskyi</a>
				<a href="/">Roman Suprun</a>
			</footer>
		);
	}
}

export default Header;
