import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "src/sass/main_style.sass"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router.tsx"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
