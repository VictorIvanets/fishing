import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { PREFIX_STATIC } from '../app/prefix'

const wsLink = new WebSocketLink({
	uri: `${PREFIX_STATIC}graphql`,
	options: {
		reconnect: true,
	},
})

const httpLink = createHttpLink({
	uri: `${PREFIX_STATIC}graphql`,
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('tokengql')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const wrapperHttpLink = authLink.concat(httpLink)

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	wrapperHttpLink,
)

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})
