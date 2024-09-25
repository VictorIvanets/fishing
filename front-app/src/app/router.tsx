import { createBrowserRouter } from 'react-router-dom'
// import Test1 from '../components/test1'
import { StartPage } from '../pages/startpage/index'
import { Login } from '../components/login/index'
import { Register } from '../components/register/index'
import { Suspense } from 'react'
import { PreLoaderGradient } from '../widgets/PreLoader/index'
import { MainPage } from '../pages/mainpage'
import { RequireAuth } from './RequireAuth'
import { MapPage } from '../pages/mappage'
import { SetsPage } from '../pages/setspage'
import { AboutPage } from '../pages/aboutpage'
import { Rules } from '../components/rules'

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: (
				<Suspense fallback={<PreLoaderGradient />}>
					<StartPage />
				</Suspense>
			),
			children: [
				{
					path: `login`,
					element: (
						<Suspense fallback={<PreLoaderGradient />}>
							<Login />
						</Suspense>
					),
				},
				{
					path: 'register',
					element: (
						<Suspense fallback={<PreLoaderGradient />}>
							<Register />
						</Suspense>
					),
				},
			],
		},

		{
			path: '/rules',
			element: (
				<Suspense fallback={<PreLoaderGradient />}>
					<Rules />
				</Suspense>
			),
		},

		{
			path: '/main/:login',
			element: (
				<RequireAuth>
					<Suspense fallback={<PreLoaderGradient />}>
						<MainPage />
					</Suspense>
				</RequireAuth>
			),
			children: [
				{
					path: 'map',
					element: <MapPage />,
				},
				{
					path: 'sets/:id',
					element: <SetsPage />,
				},
				{
					path: 'about',
					element: <AboutPage />,
				},
			],
		},
		{
			path: '*',
			element: (
				<Suspense fallback={<PreLoaderGradient />}>
					<StartPage />
				</Suspense>
			),
		},
	],
	{ basename: '/fishapp' },
)
