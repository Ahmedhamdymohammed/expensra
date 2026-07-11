import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FormButton, Input, Section, Text } from "../components/common";
import { MdOutlineMailLock } from "../assets/icons/icons";
import { useResendOTP, useVerifyUser } from "../hooks";
import { showToast } from "../utils";

const OTP = () => {
  const { mutate: verify, isPending } = useVerifyUser();
  const { mutate: resendCode, isPending: isResend } = useResendOTP();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    verify(data, {
      onSuccess: () => {
        navigate("/", { replace: true });
        showToast("auth.successRegister", "success", t);
        localStorage.removeItem('user');
      },
      onError: () => {
        showToast("auth.invalidOtp", "error", t);
      },
    });
  };

  const resendOTP = ()=>{
    const data = JSON.parse(localStorage.getItem('user'))
    resendCode(data, {
      onSuccess: ()=> {
        showToast("auth.verificationCodeResent", "success", t)
      }
    })
  }

  return (
    <Section className="bg-secondary text-primary h-dvh content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <span className="flex-center text-accent m-auto w-fit text-5xl md:text-7xl">
          <MdOutlineMailLock />
        </span>
        <Text
          tagElement="h1"
          i18nKey="auth.otpVerification"
          className="text-accent pt-2 text-center text-2xl font-semibold md:text-4xl"
        />
        <Text
          tagElement="h5"
          i18nKey="auth.otpDescription"
          className="text-muted border-bottom mt-4 mb-8 pb-4 text-center text-sm font-semibold"
        />
        <Input i18nKey="auth.otpTitle" id="otp" register={register} />

        <FormButton
          i18nKey="auth.otpButton"
          className="mt-10"
          isPending={isPending}
        />
        <div>

        <Text
          tagElement="h5"
          i18nKey="auth.otpResendCode"
          className="text-muted text-md pt-3 text-center"
          components={[
            <button
            type="button"
            onClick={resendOTP}
            className={`text-accent cursor-pointer ${isResend ? "cursor-not-allowed" : ""}`}
            />,
          ]}
          />
          </div>
      </form>
    </Section>
  );
};

export default OTP;
