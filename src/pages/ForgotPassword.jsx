import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EmailInput, FormButton, Section, Text } from "../components/common";
import { BsExclamationOctagon } from "../assets/icons/icons";
import { useForgotPassword } from "../hooks";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { mutate: OTPFun, isPending } = useForgotPassword();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    OTPFun(data, {
      onSuccess: () => {
        navigate("/reset-password");
        localStorage.setItem("resetEmail", data.email);
      },
    });
  };

  return (
    <Section className="bg-secondary text-primary h-dvh content-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <span className="flex-center text-accent m-auto w-fit text-5xl md:text-7xl">
          <BsExclamationOctagon />
        </span>
        <Text
          tagElement="h1"
          i18nKey="auth.forgotPassword"
          className="text-accent pt-2 text-center text-2xl font-semibold md:text-4xl"
        />
        <Text
          tagElement="p"
          i18nKey="auth.forgotPasswordDescription"
          className="text-muted border-bottom mt-4 mb-8 pb-4 text-center text-sm font-semibold"
        />
        <EmailInput register={register} error={errors.email} />
        <div className="flex-end relative w-80 items-center gap-5 pb-5 ltr:ml-auto rtl:mr-auto">
          <Text
            tagElement={Link}
            to={-1}
            i18nKey="auth.goToBack"
            className="text-accent flex-end mt-10 w-full text-sm hover:underline"
          />
          <FormButton
            i18nKey="auth.sendResetCode"
            isPending={isPending}
            className="mt-10"
          />
        </div>
      </form>
    </Section>
  );
};

export default ForgotPassword;
