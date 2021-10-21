import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

    const logo = require('../Images/Wiboo-logos.jpeg')
	return (
		<div className='nav'>
			<Link to='/'>
				<img className="logo"
                 src={logo} alt ="Logo"/>
			</Link>
			<nav>
				<Link to='/' className='links'>
					Home
				</Link>
				<Link to='/JoinChat' className='links'>
					Enter A ChatRoom
				</Link>
			</nav>
		</div>
	);
};

export default Nav;
