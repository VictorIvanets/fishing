import "./start.sass"
import { memo } from "react"
import Flex from "src/components/Flex/Flex"
import List from "src/components/List"
import useGetAllByUser from "src/hooks/useGetAllByUser"

const Start = memo(() => {
  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
  } = useGetAllByUser()

  return (
    <Flex centerH className="startpage">
      <Flex className="startpage__list">
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
  )
})

export default Start
