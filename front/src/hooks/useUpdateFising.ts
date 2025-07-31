import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { FishingResponseT } from "src/types/fishing"

const useUpdateFising = (_id: string) => {
  const mutation = useMutation({
    mutationFn: fishingServices.update,
    onError: (error) => {
      console.log(error)
    },
    onSuccess(response) {
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,

            data: page.data.map((item) =>
              response._id === item._id ? response : item
            ),
          }))

          return { ...prev, pages }
        }
      )
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH_USER],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,

            data: page.data.map((item) =>
              response._id === item._id ? response : item
            ),
          }))

          return { ...prev, pages }
        }
      )
    },
  })
  const queryClient = useQueryClient()

  return {
    updete: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useUpdateFising
