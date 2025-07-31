import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { FishingResponseT } from "src/types/fishing"

const useDeleteFising = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: fishingServices.deleteItem,
    onError: (error) => {
      console.log(error)
    },
    onSuccess(response) {
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH_USER],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,
            data: page.data.filter((item) => response._id !== item._id),
          }))

          return { ...prev, pages }
        }
      )
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,
            data: page.data.filter((item) => response._id !== item._id),
          }))

          return { ...prev, pages }
        }
      )
    },
  })

  return {
    deleteItem: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useDeleteFising
