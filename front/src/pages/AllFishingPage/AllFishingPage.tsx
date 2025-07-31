import "./allfishingpage.sass"
import { memo } from "react"
import Flex from "src/components/Flex/Flex"
import List from "src/components/List"
import useGetAll from "src/hooks/useGetAll"
const AllFishingPage = memo(() => {
  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
  } = useGetAll()

  return (
    <>
      <Flex centerH className="allfishingpage">
        <Flex className="allfishingpage__list">
          <List
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            data={allItems}
          />
          {isError && <h4>{error?.message}</h4>}
        </Flex>
      </Flex>
    </>
  )
})

export default AllFishingPage
