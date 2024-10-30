import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.sass'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ApolloProvider } from '@apollo/client'
import { client } from './client/client.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<RouterProvider router={router} />
			</ApolloProvider>
		</Provider>
	</StrictMode>,
)
