import Flex from "../Flex/Flex"
import "./greeting.sass"
interface GreetingProps {
  title: string
}
const Greeting = ({ title }: GreetingProps) => {
  return (
    <Flex column center className="greetingwrapper">
      <Flex column center className="greeting">
        <h1>
          ВІТАЮ! <br /> {title.toLocaleUpperCase()}
        </h1>
      </Flex>
    </Flex>
  )
}

export default Greeting
