import { FormButton, Input, Text } from "../common";
import { useForm } from "react-hook-form";
import { CiMail, CiUser } from "../../assets/icons/icons";
import { useGetCurrentUser, useUpdateUserProfile } from "../../hooks";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const UpdateProfile = () => {
  const { data } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      profile_image: "",
    },
  });

  const onUpdate = (data) => {
    const formData = new FormData();

    formData.append("_method", "PUT");

    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.email) formData.append("email", data.email);

    const file = data.profile_image?.[0];
    if (file) {
      formData.append("profile_image", file);
    }

    updateProfile(formData, {
      onSuccess: () => {
        showToast("auth.profileUpdated", "success", t);
      },
    });
  };
  useEffect(() => {
    if (data) {
      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        profile_image: "",
      });
    }
  }, [data, reset]);
  return (
    <div className="bg-primary m-0 mt-4 rounded-md p-5">
      <Text
        tagElement="h3"
        i18nKey="profile.updateProfile"
        className="text-accent mb-5 text-2xl font-semibold"
      />
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className="flex-center gap-3">
          <Input
            i18nKey="auth.firstName"
            id="first_name"
            register={register}
            rules={{}}
          >
            <CiUser />
          </Input>
          <Input
            i18nKey="auth.lastName"
            id="last_name"
            register={register}
            rules={{}}
          >
            <CiUser />
          </Input>
        </div>
        <Input i18nKey="auth.email" id="email" register={register} readOnly>
          <CiMail />
        </Input>
        <div className="flex-center mt-5 gap-1 md:gap-5">
          <Text
            tagElement="label"
            i18nKey="profile.changeAvatar"
            className="text-secondary flex min-w-fit font-semibold"
            htmlFor="avatar"
          />
          <input
            className="file-input"
            type="file"
            id="profile_image"
            {...register("profile_image")}
          />
        </div>
        <div className="flex-end mt-5 w-fit gap-3 ltr:ml-auto rtl:mr-auto">
          {isDirty && (
            <FormButton
              type="reset"
              i18nKey="common.reset"
              onClick={() => reset()}
              className="min-w-25 bg-transparent text-(--accent) hover:text-(--accent-hover)"
            />
          )}
          <FormButton
            disabled={!isDirty}
            isPending={!isDirty || isPending}
            i18nKey={!isDirty ? "common.edit" : "common.update"}
            className="px-4"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
