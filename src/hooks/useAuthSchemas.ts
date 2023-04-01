import * as yup from "yup";
import { t } from "i18next";

/**
 @returns {object} {registerSchema} - the schema object for the registration form validation
 @returns {object} : {LoginSchema} - the schema object for the login form validation
 */
export const useAuthSchemas = () => {
  const errors = {
    userNameRequiredError: t("data.errors.registration.username.required"),
    userNameMinLengthError: t("data.errors.registration.username.minLength"),
    userEmailRequiredError: t("data.errors.registration.email.required"),
    userEmailFormatError: t("data.errors.registration.email.emailFormat"),
    passwordRequiredError: t("data.errors.registration.password.required"),
    confirmPasswordRequiredError: t(
      "data.errors.registration.confirmPassword.required"
    ),
    passwordMismatchError: t(
      "data.errors.registration.confirmPassword.mismatch"
    ),
    passwordMinLengthError: t("data.errors.registration.password.minLength"),
    passwordUpperCaseError: t("data.errors.registration.password.upperCase"),
    passwordLowerCaseError: t("data.errors.registration.password.lowerCase"),
    passwordSpecialCharacterError: t(
      "data.errors.registration.password.specialCharacter"
    ),
    passwordNumberRequiredError: t(
      "data.errors.registration.password.numberRequired"
    ),
    nameRequiredError: t("data.errors.checkout.name.required"),
    cityRequiredError: t("data.errors.checkout.city.required"),
    mobileRequiredError: t("data.errors.checkout.mobile.required"),
    stateRequiredError: t("data.errors.checkout.state.required"),
    zipRequiredError: t("data.errors.checkout.zip.required"),
    addressesRequiredError: t("data.errors.checkout.address.required"),
    paymentMethodRequiredError: t(
      "data.errors.checkout.payment_method.required"
    ),
  };

  const registerSchema = yup.object({
    username: yup
      .string()
      .min(4, errors.userNameMinLengthError)
      .required(errors.userNameRequiredError),
    email: yup
      .string()
      .email(errors.userEmailFormatError)
      .required(errors.userEmailRequiredError),
    password: yup
      .string()
      .required(errors.passwordRequiredError)
      .min(6, errors.passwordMinLengthError)
      .test("UpperCaseError", errors.passwordUpperCaseError, function (value) {
        const regex = /[A-Z]/;
        if (value?.match(regex)) {
          return true;
        }
        const { path, createError } = this;

        return createError({
          path,
          message: errors.passwordUpperCaseError,
        });
      })
      .test("LowerCaseError", errors.passwordLowerCaseError, function (value) {
        const regex = /[a-z]/;
        if (value?.match(regex)) {
          return true;
        }
        const { path, createError } = this;

        return createError({
          path,
          message: errors.passwordLowerCaseError,
        });
      })
      .test(
        "SpecialCharacter",
        errors.passwordSpecialCharacterError,
        function (value) {
          const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
          if (value?.match(regex)) {
            return true;
          }
          const { path, createError } = this;

          return createError({
            path,
            message: errors.passwordSpecialCharacterError,
          });
        }
      )
      .test(
        "IncludeNumber",
        errors.passwordNumberRequiredError,
        function (value) {
          const regex = /\d/;
          if (value?.match(regex)) {
            return true;
          }
          const { path, createError } = this;

          return createError({
            path,
            message: errors.passwordNumberRequiredError,
          });
        }
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], errors.passwordMismatchError)
      .required(errors.confirmPasswordRequiredError),
  });

  const loginSchema = yup.object({
    email: yup
      .string()
      .email(errors.userEmailFormatError)
      .required(errors.userEmailRequiredError),
    password: yup.string().required(errors.passwordRequiredError),
  });

  const checkoutFormSchema = yup.object({
    name: yup.string().required(errors.userNameRequiredError),
    mobile: yup.string().required(errors.userNameRequiredError),
    email: yup
      .string()
      .email(errors.userEmailFormatError)
      .required(errors.userEmailRequiredError),
    city: yup.string().required(errors.userNameRequiredError),
    state: yup.string().required(errors.userNameRequiredError),
    zip: yup.number().required(errors.userNameRequiredError),
    address: yup.string().required(errors.userNameRequiredError),
    payment_method: yup.string().required(errors.userNameRequiredError),
    note: yup.string().required(errors.userNameRequiredError),
  });

  return {
    registerSchema,
    loginSchema,
    checkoutFormSchema,
  };
};
