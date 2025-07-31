import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { FishingPayloadT, OneFishingT } from "src/types/fishing"

const useCreateFising = () => {
  const mutation = useMutation({
    mutationFn: fishingServices.create,
    onError: (error) => {
      console.log(error)
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = mutation

  const create = (payload: FishingPayloadT) => {
    mutate(payload, {
      onSuccess(response) {
        queryClient.setQueryData<InfiniteData<OneFishingT[]>>(
          [QUERY_KEY.ALL_FISH],
          (prev) => {
            if (!prev) return prev

            const pages = prev?.pages.map((page) => ({
              ...page,
              response,
            }))

            return { ...prev, pages }
          }
        )
      },
    })
  }
  return {
    create,
    isLoading: isPending,
  }
}

export default useCreateFising
