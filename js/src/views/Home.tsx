import './home.css';

import CalendarView from '../components/CalendarView';
import NeedAndGive from '../components/NeedAndGive';

const Home = () => (
	<div className="page">
		<h2>Welcome to Need and Give!</h2>
		<CalendarView />
		<NeedAndGive />
	</div>
);

export default Home;
