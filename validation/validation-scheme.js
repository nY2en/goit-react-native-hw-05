import * as Yup from "yup";

export const SIGNUP_SCHEME = Yup.object().shape({
  login: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Please enter your full login"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Must contain minimum 8 characters, at least one uppercase letter, one lower case letter and one special character"
    ),
});

export const LOGIN_SCHEME = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Must contain minimum 8 characters, at least one uppercase letter, one lower case letter and one special character"
    ),
});
