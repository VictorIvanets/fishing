import "./allfishingpage.sass"
import { memo } from "react"
import { useQuery } from "@tanstack/react-query"
import { fishingServices } from "src/services/fishing.services"
import Flex from "src/components/Flex/Flex"
import List from "src/components/List"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { QUERY_KEY } from "src/types/constants"
const AllFishingPage = memo(() => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.ALL_FISH],
    queryFn: fishingServices.getAll,
  })

  return (
    <>
      <Flex centerH className="allfishingpage">
        <Flex className="allfishingpage__list">
          {data && <List data={data} />}
          {isLoading && <Preloader />}
          {isError && <h4>{error.message}</h4>}
        </Flex>
      </Flex>
    </>
  )
})

export default AllFishingPage
