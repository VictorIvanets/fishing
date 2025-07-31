import Flex from "src/components/Flex/Flex"
import "./ckeckdeletecomment.sass"
import Button from "src/components/Button/Button"
interface CkeckDeleteProps {
  titleCheck: string
  setDeleteItem: React.Dispatch<React.SetStateAction<boolean>>
  deleteItem: () => void
}

const CkeckDeleteComment = ({
  setDeleteItem,
  titleCheck,
  deleteItem,
}: CkeckDeleteProps) => {
  return (
    <Flex gap={25} center className="ckeckdeletecomment">
      <Button
        onClick={() => setDeleteItem(false)}
        appearence="small"
        title="Ні"
      />
      <p className="tacenter">{titleCheck}</p>
      <Button
        onClick={() => {
          deleteItem()
        }}
        appearence="small"
        title="Так"
      />
    </Flex>
  )
}

export default CkeckDeleteComment
