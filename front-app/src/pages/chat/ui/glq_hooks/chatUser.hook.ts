import { useMutation, useSubscription } from '@apollo/client'
import { _queries } from '../../../../gql/query.graphql'
import { ICheckIn, ICheckOut, UseSubCheck } from './chat.types'

export const useCheckOut = (): ICheckOut => {
	const [userOut, { data, loading, error }] = useMutation(_queries.CheckOut)
	const userOutByUserId = (userId: string) => {
		userOut({
			variables: {
				userId,
			},
		})
	}
	return {
		userOutByUserId,
		loadingCheckOut: loading,
		errorCheckOut: error,
		checkOut: data && data.checkOut,
	}
}
export const useCheckIn = (): ICheckIn => {
	const [userIn, { data, loading, error }] = useMutation(_queries.CheckIn)
	const userInByUserName = (newUser: string) => {
		userIn({
			variables: {
				newUser,
			},
		})
	}
	return {
		userInByUserName,
		loadingChecIn: loading,
		errorCheckIn: error,
		userIn: data && data.userIn,
	}
}

export const useSubscribeForCheck = (): UseSubCheck => {
	const { data, loading } = useSubscription(_queries.UserChek)

	return {
		loading,
		subdata: data && data.userChek,
	}
}
