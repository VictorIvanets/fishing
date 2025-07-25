import { useNavigate } from "react-router-dom"
import "./about.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import MaterialIcon from "src/shared/icons/Materialicons"
interface AboutProps {}
const About = ({}: AboutProps) => {
  const navigate = useNavigate()

  return (
    <FadeIn>
      <Flex column centerV spredV className="about">
        <h2 className="tacenter">ПРАВИЛА КОРИСТУВАННЯ</h2>
        <br />
        <ul>
          <li>
            Зареєструйтеся. (Важливий лише логін та пароль, усе інше у довільній
            формі)
          </li>
          <li>Увійдіть.</li>
          <li>
            Далі Ви можете скористуватися картою, та позначити місце рибалки.
          </li>
          <li>Коли на карті з'явиться зелена мітка, натисніть на неї.</li>
          <li>У вікні, що з'явилося, заповніть дату, назву та опис рибалки.</li>
          <li>Також Ви можете оцінити її.</li>
          <li>Натисніть "Додати".</li>

          <h3>Перелік рибалок:</h3>

          <li>Праворуч будуть додаватися усі Ваші рибалки.</li>
          <li>
            Ви можете переглянути місце рибалки на карті, або видалити запис.
          </li>
          <li>
            Натиснувши на блок, Ви переходите до повної інформації, та можете
            додати фото, натиснувши на "Завантажити фото".
          </li>
          <li> Натисніть "Вибрати фото", та "Завантажити"</li>
          <h3>Усі записи:</h3>
          <li>
            Для того, щоб пидивитися усі мітки, натисніть "Показати усі місця".
          </li>
          <li>
            Натиснувши на мітку, можна перейти до детальної інформації про це
            місце.
          </li>
        </ul>
        <br />
        <h3 className="tacenter">Уся інформація у загальному користуванні!</h3>
        <h3 className="tacenter">Усі користувачі можуть бачити усі місця!</h3>
        <br />

        <Flex className="about__back" onClick={() => navigate(-1)}>
          <h1>
            <MaterialIcon name="MdArrowBackIos" />
          </h1>
        </Flex>
      </Flex>
    </FadeIn>
  )
}

export default About
