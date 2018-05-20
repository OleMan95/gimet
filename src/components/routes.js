import StartPage from './StartPage/';
import Signin from './Signin/';
import ProfilePage from './ProfilePage/';
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
		path: '/profile/:id',
		component: ProfilePage,
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