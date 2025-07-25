import { memo } from "react"
import "./list.sass"
import type { OneFishingT } from "src/types/fishing"
import Card from "../Card"

interface ListProps {
  data: OneFishingT[]
  label?: string
}

const List = memo(({ data, label }: ListProps) => {
  const reversData = [...data].reverse()
  return (
    <div className="listwrapper">
      <h4 className="list__label">{label}</h4>
      <div className="list">
        {data && reversData.map((i) => <Card key={i._id} item={i} />)}
      </div>
    </div>
  )
})

export default List
