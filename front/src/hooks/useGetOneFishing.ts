import { useQuery } from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"

const useGetOneFishing = (id: string | undefined) => {
  const { data, isError, error } = useQuery({
    queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
    queryFn: () => fishingServices.getOne(id!),
    enabled: !!id,
  })
  return {
    data,
    isError,
    error,
  }
}

export default useGetOneFishing
