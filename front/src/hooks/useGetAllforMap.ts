import { useQuery } from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { ResponseForMapT } from "src/types/fishing"

const useGetAllforMap = () => {
  const { data, isError, error, isLoading } = useQuery<ResponseForMapT[]>({
    queryKey: [QUERY_KEY.ALL_FISH_FOR_MAP],
    queryFn: fishingServices.getAllforMap,
  })

  return {
    data,
    isError,
    error,
    isLoading,
  }
}

export default useGetAllforMap
