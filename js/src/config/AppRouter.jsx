import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from '../views/Home';

const AppRouter = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</Router>
);

export default AppRouter;
