import Button from "src/components/Button/Button"
import "./filter.sass"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import type { ResponseForMapT } from "src/types/fishing"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
interface FilterProps {
  allFishins: ResponseForMapT[]
  setFilterAll: React.Dispatch<React.SetStateAction<ResponseForMapT[]>>
}
const Filter = ({ allFishins, setFilterAll }: FilterProps) => {
  const [value, setValue] = useState<string>()
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)

  useEffect(() => {
    if (value === "my" && userId) {
      const result = allFishins.filter((i) => i.userId === userId)
      setFilterAll(result)
    } else if (value === "rating7") {
      console.log(value)
      const result = allFishins.filter((i) => i.score >= 7)
      setFilterAll(result)
    } else if (value) {
      const result = allFishins.filter((i) =>
        i.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
      setFilterAll(result)
    } else {
      setFilterAll(allFishins)
    }
  }, [value])

  return (
    <FadeIn className="filter">
      <Flex flex gap={8} column center>
        <h4>Фільтр</h4>
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Короп"
          value="короп"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Карась"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Товстолоб"
          value="лоб"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Амур"
          value="амур"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Линок"
          value="лин"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Лящ"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Щука"
          value="щук"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Судак"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btn"
          title="Сом"
        />
        <Button
          onClick={() => setValue(undefined)}
          className="filter__btnmy"
          title="Всі місця"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btnmy"
          title="Оцінка > 7"
          value="rating7"
        />
        <Button
          onClick={(e) => setValue(e.currentTarget.value)}
          className="filter__btnmy"
          title="Мої місця"
          value="my"
        />
      </Flex>
    </FadeIn>
  )
}

export default Filter
