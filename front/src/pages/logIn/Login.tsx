import { memo, useEffect } from "react"
import "./login.sass"
import Flex from "src/components/Flex/Flex"
import Button from "src/components/Button/Button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { authThunk } from "src/store/auth.slice"
import Greeting from "src/components/Greeting/Greeting"
import FadeIn from "src/components/FadeIn/FadeIn"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userLogInSchema, type UserLogInDataFields } from "./userProfileSchema"
import InputText from "src/components/Input/InputText"

interface LoginProps {}
const Login = memo(({}: LoginProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((s: RootState) => s.auth)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserLogInDataFields>({
    resolver: zodResolver(userLogInSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const submit = async (data: { login: string; password: string }) => {
    dispatch(
      authThunk({
        login: data.login,
        password: data.password,
      })
    )
    reset()
  }

  useEffect(() => {
    if (!data.errorMassege && data.authinfo?.access_token) {
      setTimeout(() => {
        navigate("/mypage")
      }, 1000)
    }
  }, [data])

  return (
    <>
      {data.authinfo?.login ? (
        <Greeting title={data.authinfo?.login} />
      ) : data.isLoading ? (
        <Preloader />
      ) : (
        <FadeIn>
          <Flex column center gap={35} className="login">
            <h2>ВХІД У АКАУНТ</h2>
            {data.errorMassege ? (
              <p className="login__error">{data.errorMassege}</p>
            ) : (
              <p></p>
            )}
            <form onSubmit={handleSubmit(submit)} className="login__submitform">
              <Flex center column gap={25}>
                <Flex className="login__submitform__input" column>
                  <InputText
                    id="input_login"
                    label="Логін"
                    {...register("login")}
                    error={errors.login?.message}
                  />
                  <InputText
                    id="input_password"
                    label="Пароль"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                </Flex>
                <Button
                  isValid={isValid}
                  type="submit"
                  appearence="big"
                  title="ВХІД"
                />
              </Flex>
            </form>
            <Link to={"/register"}>
              <p>не маєте акаунта? зареєструйтеся</p>
            </Link>
          </Flex>
        </FadeIn>
      )}
    </>
  )
})

export default Login
