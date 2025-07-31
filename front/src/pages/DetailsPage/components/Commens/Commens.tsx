import Flex from "src/components/Flex/Flex"
import "./comments.sass"
import type { OneFishingT } from "src/types/fishing"
import AddComment from "./addComment"
import CommentList from "src/components/CommentList"
import { IoIosCloseCircle } from "react-icons/io"
import type { CommentResponseT } from "src/types/comments.types"
interface CkeckDeleteProps {
  setComments: React.Dispatch<React.SetStateAction<boolean>>
  data: OneFishingT
  comments: CommentResponseT[] | undefined
  isLoading: boolean
}

const Comments = ({
  setComments,
  data,
  comments,
  isLoading,
}: CkeckDeleteProps) => {
  return (
    <Flex column gap={10} centerV spredV className="comments">
      <Flex className="comments__header" centerV spredV>
        <h3>КОМЕНТАРІ ДО РИБАЛКИ</h3>
        <h1 className="icomhover" onClick={() => setComments(false)}>
          <IoIosCloseCircle />
        </h1>
      </Flex>
      <Flex className="comments__list">
        <CommentList
          data={[...(comments ?? [])].reverse()}
          isLoading={isLoading}
        />
      </Flex>

      <AddComment data={data} />
    </Flex>
  )
}

export default Comments
