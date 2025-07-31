import { memo, useState } from "react"
import type { CommentResponseT } from "src/types/comments.types"
import Flex from "../Flex/Flex"
import "./commentList.sass"
import MaterialIcon from "src/shared/icons/Materialicons"
import normalizeMongoDate from "src/helpers/normalizeMongoDate"
import useDeleteComment from "src/hooks/useDeleteComment"
import CkeckDeleteComment from "./Delete/CkeckDeleteComment"

interface ListProps {
  data: CommentResponseT
  userId: string | undefined
}

const CommentCard = memo(({ data, userId }: ListProps) => {
  const { deleteComment } = useDeleteComment(data.setId)
  const [checkDel, setCheckDel] = useState(false)

  return (
    <Flex spredV className="commentcard_wrapper">
      <Flex className="commentcard">
        <p>{data.comment}</p>
        <Flex className="commentcard__name">
          <p>{data.login}</p>
        </Flex>
        <Flex className="commentcard__date">
          <p>{normalizeMongoDate(data.createdAt)}</p>
        </Flex>
      </Flex>
      {userId === data.useId && (
        <h1 onClick={() => setCheckDel(true)} className="commentcard__delete">
          <MaterialIcon name="MdDeleteForever" />
        </h1>
      )}
      {checkDel && (
        <CkeckDeleteComment
          titleCheck={"видалити коментар?"}
          setDeleteItem={setCheckDel}
          deleteItem={() => deleteComment(data._id)}
        />
      )}
    </Flex>
  )
})

export default CommentCard
