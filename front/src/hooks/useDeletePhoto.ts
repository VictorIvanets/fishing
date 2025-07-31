import { useMutation, useQueryClient } from "@tanstack/react-query"
import { photoServices } from "src/services/photo.services"
import { QUERY_KEY } from "src/types/constants"

const useDeletePhoto = (id: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: photoServices.deletePhoto,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LOAD_PHOTO, id],
      })
    },
  })

  return {
    deletePhoto: mutation.mutateAsync,
  }
}

export default useDeletePhoto
