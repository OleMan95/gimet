import StartPage from './StartPage/';
import Signin from './Signin/';
import Signup from './Signup/';
import ProfilePage from './ProfilePage/';
import ProfileExpertsPage from './ProfileExpertsPage/index';
import ExpertsPage from './ExpertsPage/';
import EditorPage from './EditPage/';
import ConsultationPage from './ConsultationPage/';
import NotFound from './NotFound/';

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
    path: '/profile-experts',
    component: ProfileExpertsPage,
    exact: true
  },
	{
		path: '/profile/:id',
		component: ProfilePage,
		exact: true
	},
	{
		path: '/edit-expert',
		component: EditorPage,
		exact: true
	},
	{
		path: '/experts',
		component: ExpertsPage,
		exact: true
	},
	// {
	// 	path: '/edit/:id',
	// 	component: EditorPage,
  //   exact: true
  // },
	{
	  //ToDo: change consultation route to /experts/:id
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