import Flex from "src/components/Flex/Flex"
import "./ckeckdelete.sass"
import Button from "src/components/Button/Button"
interface CkeckDeleteProps {
  title?: string
  titleCheck: string
  setDeleteItem: React.Dispatch<React.SetStateAction<boolean>>
  deleteItem: () => void
  navigate?: () => void | Promise<void>
}

const CkeckDelete = ({
  title,
  setDeleteItem,
  titleCheck,
  deleteItem,
  navigate,
}: CkeckDeleteProps) => {
  return (
    <Flex column gap={10} center className="ckeckdelete">
      <p>{titleCheck}</p>
      {title && <h4>{title}</h4>}
      <Flex gap={50}>
        <Button
          onClick={() => {
            deleteItem()
            navigate?.()
          }}
          appearence="big"
          title="Так"
        />
        <Button
          onClick={() => setDeleteItem(false)}
          appearence="big"
          title="Ні"
        />
      </Flex>
    </Flex>
  )
}

export default CkeckDelete
