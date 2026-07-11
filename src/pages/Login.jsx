import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../hooks";
import {
  AuthRedirect,
  EmailInput,
  FormButton,
  FormHeading,
  Loading,
  PasswordInput,
  Section,
  Text,
} from "../components/common";
import { CiMail, CiLock } from "../assets/icons/icons";
import { showToast } from "../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: loginUser, isPending } = useLoginUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onLogin = (loginData) => {
    loginUser(loginData, {
      onSuccess: () => {
        navigate("/dashboard", { replace: true });
        showToast("auth.successLogin", "success", t);
      },
      onError: (error) => {showToast("auth.loginError", "error", t)
        console.log(error)
      },
    });
  };

  if (isPending) return <Loading />;

  return (
    <Section className="bg-secondary h-dvh content-center px-3">
      <form className="form" onSubmit={handleSubmit(onLogin)}>
        <FormHeading text="auth.loginHeading" />
        <EmailInput error={errors.email} register={register} />
        <PasswordInput register={register} error={errors?.password} />

        <span className="text-accent flex-end px-2 pt-2 text-sm font-semibold">
          <Text
            tagElement={Link}
            to="/forgot-password"
            i18nKey="auth.forgotPassword"
            className="mt-2 hover:underline"
          />
        </span>
        <FormButton
          i18nKey="auth.login"
          isPending={isPending}
          className="mt-10"
        />
        <AuthRedirect i18nKey="auth.noAccount" to="/signup" />
      </form>
    </Section>
  );
};

export default Login;
