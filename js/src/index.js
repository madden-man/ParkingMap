import './index.scss';

import App from './App';

const { render } = wp.element; //we are using wp.element here!
if (document.getElementById('root')) {
	//check if element exists before rendering
	render(<App />, document.getElementById('root'));
}
