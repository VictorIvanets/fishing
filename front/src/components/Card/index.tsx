import type { OneFishingT } from "src/types/fishing"
import "./card.sass"
import Flex from "../Flex/Flex"
import { DEFAULT_IMG } from "./constants"
import { useNavigate } from "react-router-dom"
interface CardProps {
  item: OneFishingT
}
const Card = ({ item }: CardProps) => {
  const dateNormalize = item.date.slice(0, 10).split("-")
  const navigate = useNavigate()

  return (
    <Flex
      onClick={() => navigate(`/details/${item._id}`)}
      relativ
      column
      className="card"
    >
      <Flex absolute className="card__fon">
        <img className="card__fon__img" src={DEFAULT_IMG} alt="fon" />
      </Flex>
      <Flex className="card__content" column>
        <h4>{item.title}</h4>
        <p>{item.description}</p>

        <Flex className="card__author" absolute>
          <p>Автор: {item.userName}</p>
        </Flex>
        <Flex className="card__content__footer" spredV gap={10}>
          <p>
            Дата: {dateNormalize[2]} / {dateNormalize[1]} / {dateNormalize[0]}
          </p>
          <p>Оцінка: {item.score}</p>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Card
