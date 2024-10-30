import { ApolloError } from '@apollo/client'
import { PreLoaderGradientBox } from '../../../../widgets/PreLoader'

export function LoadingComponent(loading: boolean) {
	return loading && <PreLoaderGradientBox />
}

export function ErrorComponent(error: ApolloError | undefined) {
	return (
		error && (
			<div className="flex">
				<h2>{error.message}</h2>
			</div>
		)
	)
}
