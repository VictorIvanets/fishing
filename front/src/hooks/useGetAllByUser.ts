import { useInfiniteQuery } from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { OneFishingT } from "src/types/fishing"

const useGetAllByUser = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.ALL_FISH_USER],
    queryFn: ({ pageParam }) =>
      fishingServices.getAllByUser(pageParam as string | undefined),
    getNextPageParam: (lastPage: {
      data: OneFishingT[]
      nextCursor: string | null
    }) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  })

  const allItems = data?.pages.flatMap((page) => page.data) || []

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
  }
}

export default useGetAllByUser
