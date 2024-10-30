import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sass from 'sass'
import graphqlLoader from 'vite-plugin-graphql-loader'

export default defineConfig({
	plugins: [react(), graphqlLoader()],
	base: '/fishapp',
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
			},
		},
	},
})
