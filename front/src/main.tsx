import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "src/sass/main_style.sass"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router.tsx"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
