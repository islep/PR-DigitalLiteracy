import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Navbar from './Navbar';
import Footer from './Footer';

useEffect(() => {
	ReactGA.send({
		hitType: 'page_view',
		page_location: window.location.pathname,
	});
}, [window.location.pathname]);

const Layout = ({ children }) => (
	<>
		<div className="px-5 md:px-0">
			<Navbar />
			{children}
		</div>
		<Footer />
	</>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
