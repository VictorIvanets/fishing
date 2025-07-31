import { useQuery } from "@tanstack/react-query"
import { photoServices } from "src/services/photo.services"
import { QUERY_KEY } from "src/types/constants"

const useGetPhotoInFolder = (id: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.LOAD_PHOTO, id],
    queryFn: () => photoServices.getFotoInFolder(id!),
    enabled: !!id,
  })
  return {
    photoData: data,
    isLoadingPhoto: isLoading,
  }
}

export default useGetPhotoInFolder
