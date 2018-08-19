import React, { Component } from 'react';
import logo from "../../../data/logo.svg";
import "./index.scss";

class Footer extends Component {

	render() {
		return (
			<footer className="footer  bg-dark">
				<div className="container d-flex py-3">

					<div className="col">
						<img src={logo} alt='GIMET'/>
						<a className="navbar-brand" href="/">GIMET</a>
					</div>

					<div className="col">

						<ul>
							<li>
								<i className="ion-chevron-right"></i>
								Authors:
							</li>
							<li className="text-muted">Manachynskyi Oleksii</li>
							<li className="text-muted">Roman Suprun</li>
						</ul>
					</div>

					<div className="col">
						<ul>
							<li>
								<i className="ion-chevron-right"></i>
								<a href="/edit/new">Create new expert</a>
							</li>
							<li>
								<i className="ion-chevron-right"></i>
								<a href="/experts">Search for expert</a>
							</li>
							<li>
								<i className="ion-chevron-right"></i>
								<a href="/about">About</a>
							</li>
						</ul>
					</div>

					<div className="col">
						<a href="/experts">Email: aom-95@live.com</a>
					</div>

				</div>
			</footer>
		);
	}
}

export default Footer;
