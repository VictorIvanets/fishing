import { Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { RequireAuth } from "src/components/RequireAuth/RequireAuth"
import { About } from "src/pages/About"
import { Home } from "src/pages/Home"
import Layout from "src/pages/Layout/Layout"
import { Login } from "src/pages/logIn"
import { MyPage } from "src/pages/MyPage"
import { RegisterUser } from "src/pages/RegisterUser"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },

        {
          path: "home",
          element: (
            <Suspense fallback={<Preloader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<Preloader />}>
              <About />
            </Suspense>
          ),
        },

        {
          path: "login",
          element: (
            <Suspense fallback={<Preloader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Preloader />}>
              <RegisterUser />
            </Suspense>
          ),
        },
        {
          path: "mypage",
          element: (
            <Suspense fallback={<Preloader />}>
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            </Suspense>
          ),
          // children: [
          //   { index: true, element: <Navigate to="start" replace /> },
          //   {
          //     path: "start",
          //     element: (
          //       <Suspense fallback={<Preloader />}>
          //         <Start />
          //       </Suspense>
          //     ),
          //   },
          //   {
          //     path: "mappage",
          //     element: (
          //       <Suspense fallback={<Preloader />}>
          //         <MapPage />
          //       </Suspense>
          //     ),
          //   },
          //   {
          //     path: "allfishings",
          //     element: (
          //       <Suspense fallback={<Preloader />}>
          //         <AllFishingPage />
          //       </Suspense>
          //     ),
          //   },
          // ],
        },

        // {
        // 	path: 'movie/:id',
        // 	element: (
        // 		<Suspense fallback={<Preloader />}>
        // 			<MoviesById />
        // 		</Suspense>
        // 	),
        // },
      ],
    },

    {
      path: "*",
      element: (
        <Suspense fallback={<Preloader />}>
          <Layout />
        </Suspense>
      ),
    },
  ],

  {
    basename: "/",
  }
)
