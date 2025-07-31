import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentsServices } from "src/services/comments.services"
import { QUERY_KEY } from "src/types/constants"

const useDeleteComment = (setId: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: commentsServices.deleteItem,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_COMMENTS, setId],
      })
    },
  })

  return {
    deleteComment: mutation.mutateAsync,
  }
}

export default useDeleteComment
