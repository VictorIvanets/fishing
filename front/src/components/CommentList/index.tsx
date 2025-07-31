import { useRef, memo } from "react"
import { Preloader } from "../preloaders/PreloaderBall"
import type { CommentResponseT } from "src/types/comments.types"
import "./commentList.sass"
import CommentCard from "./CommentCard"
import { useAutoScrollToRef } from "src/hooks/useAutoScrollToRef"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import Flex from "../Flex/Flex"

interface ListProps {
  data: CommentResponseT[] | undefined
  label?: string
  isLoading?: boolean
}

const CommentList = memo(({ data, label, isLoading }: ListProps) => {
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)
  const observerRef = useRef<HTMLDivElement | null>(null)
  useAutoScrollToRef(observerRef, [data])

  return (
    <div className="listwrapper">
      {label && <h4 className="list__label">{label}</h4>}
      <div className="list">
        {!data?.length && (
          <Flex column flex center>
            <p>Коментарі відсутні</p>
            <p>Напишіть коментар для цього запису</p>
          </Flex>
        )}
        {data &&
          data.map((i) => <CommentCard userId={userId} key={i._id} data={i} />)}
        {isLoading && (
          <div className="listwrapper__loader">
            <Preloader />
          </div>
        )}

        <div ref={observerRef} style={{ height: "0px", marginTop: "-1px" }} />
      </div>
    </div>
  )
})

export default CommentList
