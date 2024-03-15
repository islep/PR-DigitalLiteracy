import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { AuthProvider } from './firebase/AuthContext';
import PATHS from './paths';
import components from './components';
import Layout from './Layouts/layout';

ReactGA.initialize('your GA measurement id');

function App() {
	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});
	return (
		<AuthProvider>
			<Router>
				<Layout>
					<Routes>
						{Object.keys(PATHS).map((pathName) => {
							const href = PATHS[pathName];
							const Component = components[pathName];
							return <Route key={pathName} path={href} element={<Component />} />;
						})}
					</Routes>
				</Layout>
			</Router>
		</AuthProvider>
	);
}

export default App;
