import { useQuery } from "@tanstack/react-query"
import { commentsServices } from "src/services/comments.services"
import { QUERY_KEY } from "src/types/constants"

const useGetCommens = (id: string | undefined) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_COMMENTS, id],
    queryFn: () => commentsServices.getAllByFishingId(id!),
    enabled: !!id,
  })

  return {
    comments: data,
    isError,
    error,
    isLoading,
  }
}

export default useGetCommens
