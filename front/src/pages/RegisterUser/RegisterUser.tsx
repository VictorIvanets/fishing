import Flex from "src/components/Flex/Flex";
import Button from "src/components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userRegisterSchema,
  type UserRegisterDataFields,
} from "./userRegisterSchema";
import type { RegisterPayloadT } from "src/types/auth.types";
import FadeIn from "src/components/FadeIn/FadeIn";
import InputText from "src/components/Input/InputText";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "src/store/store";
import { registerThunk, userActions } from "src/store/register.slice";
import { useEffect, useState } from "react";
import { authThunk } from "src/store/auth.slice";
import { Preloader } from "src/components/preloaders/PreloaderBall";

interface RegisterUserProps {}
const RegisterUser = ({}: RegisterUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((s: RootState) => s.register);
  const navigate = useNavigate();
  const [pass, setPass] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserRegisterDataFields>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      login: "",
      password: "",
      name: "",
      subname: "",
      country: "",
      city: "",
    },
  });

  const submit = async (data: RegisterPayloadT) => {
    setPass(data.password);
    dispatch(registerThunk(data));
    reset();
  };

  useEffect(() => {
    dispatch(userActions.clearRegister());
    setPass("");
  }, []);

  useEffect(() => {
    if (!data.errorMassege && data.data) {
      data.data &&
        dispatch(
          authThunk({
            login: data.data?.login,
            password: pass,
          })
        );
      navigate("/mypage");
    }
  }, [data]);

  return (
    <>
      <FadeIn>
        <Flex column center gap={5} className='registerform login'>
          <h3>РЕЄСТРАЦІЯ</h3>
          {data.errorMassege ? (
            <p className='login__error'>{data.errorMassege}</p>
          ) : (
            <p></p>
          )}
          {data.isLoading ? (
            <Preloader />
          ) : (
            <form onSubmit={handleSubmit(submit)} className='login__submitform'>
              <Flex center column gap={25}>
                <Flex className='login__submitform__input' column>
                  <InputText
                    id='input_login_register'
                    label='Логін'
                    {...register("login")}
                    error={errors.login?.message}
                  />
                  <InputText
                    id='input_password_register'
                    label='Пароль'
                    {...register("password")}
                    error={errors.password?.message}
                  />
                  <InputText
                    id='input_name'
                    label='Ім’я'
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <InputText
                    id='input_subname'
                    label='Прізвище'
                    {...register("subname")}
                    error={errors.subname?.message}
                  />
                  <InputText
                    id='input_country'
                    label='Країна'
                    {...register("country")}
                    error={errors.country?.message}
                  />
                  <InputText
                    id='input_city'
                    label='Місто'
                    {...register("city")}
                    error={errors.city?.message}
                  />
                </Flex>
                <Button
                  isValid={isValid}
                  type='submit'
                  appearence='big'
                  title='SUBMIT'
                />
              </Flex>
            </form>
          )}
          <Link to={"/login"}>
            <p>вхід</p>
          </Link>
        </Flex>
      </FadeIn>
    </>
  );
};

export default RegisterUser;
