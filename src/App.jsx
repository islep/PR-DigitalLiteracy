import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthContext';
import PATHS from './paths';
import components from './components';
import Layout from './Layouts/layout';

function App() {
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
