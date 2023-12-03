import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
	<>
		<div className="px-5 md:px-0 min-h-screen">
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
