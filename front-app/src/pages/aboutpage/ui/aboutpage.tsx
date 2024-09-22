import { Rules } from '../../../components/rules'

function AboutPage() {
	return (
		<div className="aboutpage">
			<div className="aboutpage__rules">
				<Rules />
			</div>
			<div className="aboutpage__text">
				<h2>ПРО ПРОЄКТ</h2>
				<p>
					Додаток створено у навчальних цілях. <br />
					API розташовано на платформі render.com, <br />
					з безкоштовним доступом, <br />
					тому при неактивності додатку, сервер припиняє роботу,
					<br />
					та видаляє усі статичні файли, фото.
					<br />
					Проте уся інша інформація залишається у базі даних.
					<br />
					Далі функціонал буде розширюватися
					<br />
					Проєкт створено: <br />
					frontend: React, <br />
					backend: NestJS, <br />
					data base: MongoDB <br />
					<a href="https://github.com/VictorIvanets/fishing">
						Код тут: https://github.com/VictorIvanets/fishing
					</a>
					<br />
					<a href="https://ivanetsvictor.site/">
						Розробник: ivanetsvictor.site
					</a>
				</p>
			</div>
		</div>
	)
}

export default AboutPage
