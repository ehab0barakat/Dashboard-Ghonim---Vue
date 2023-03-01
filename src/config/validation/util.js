import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

export const validateErrorsIfExists = (prop) => {
  return prop.$errors && prop.$errors.length && prop.$errors.length > 0
    ? prop.$errors.map((e) => e.$message)
    : [];
};

export const validatePhoto = (photo) => {
  const errors = [];

  if (photo.length == 1) {
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        photo[0].type
      )
    )
      errors.push(t("validations.photoType"));

    if (photo[0].size / 1e6 > 5) errors.push(t("validations.photoSize"));
  }

  return errors;
};
