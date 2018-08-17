import StartPage from './StartPage/';
import Signin from './Signin/';
import Signup from './Signup/';
import ProfilePage from './ProfilePage/';
import ExpertsPage from './ExpertsPage/';
import EditorPage from './EditPage/';
import ConsultationPage from './ConsultationPage/';
import NotFound from './NotFound';

/**
 * array with page routes
 * @type {*[]}
 */
const routes = [
	{
		path: '/',
		component: StartPage,
		exact: true
	},
	{
		path: '/login',
		component: Signin,
		exact: true
	},
	{
		path: '/signup',
		component: Signup,
		exact: true
	},
	{
		path: '/profile/:id',
		component: ProfilePage,
		exact: true
	},
	{
		path: '/experts',
		component: ExpertsPage,
		exact: true
	},
	{
		path: '/edit/:id',
		component: EditorPage,
    exact: true
  },
	{
		path: '/consultation/:id',
		component: ConsultationPage,
    exact: true
	},
	{
		path: '*',
		component: NotFound
	}
];

export default routes;