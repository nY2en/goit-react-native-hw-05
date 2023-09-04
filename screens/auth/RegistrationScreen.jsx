import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import styles from "../../styles/form";
import { SIGNUP_SCHEME } from "../../validation";

export const RegistrationScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordHidden, setisPasswordHidden] = useState(true);
  const [dimensions, setDimensions] = useState(
    () => Dimensions.get("window").width
  );

  const navigation = useNavigation();

  useEffect(() => {
    Dimensions.addEventListener("change", onDimensionsChange);
  }, []);

  const showHidePassword = () => setisPasswordHidden((prevState) => !prevState);
  const showKeyboard = () => setIsKeyboardShown(true);
  const hideKeyboard = () => setIsKeyboardShown(false);
  const onDimensionsChange = () =>
    setDimensions(Dimensions.get("window").width);

  Platform.OS === "ios"
    ? Keyboard.addListener("keyboardWillShow", showKeyboard)
    : Keyboard.addListener("keyboardDidShow", showKeyboard);

  Platform.OS === "ios"
    ? Keyboard.addListener("keyboardWillHide", hideKeyboard)
    : Keyboard.addListener("keyboardDidHide", hideKeyboard);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/mountain.jpg")}
          style={styles.background}
        >
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
            <Formik
              initialValues={{ login: "", email: "", password: "" }}
              validationSchema={SIGNUP_SCHEME}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                navigation.navigate("Home");
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                return (
                  <View
                    style={{
                      ...styles.form,
                      paddingBottom: isKeyboardShown
                        ? 0
                        : dimensions > 450
                        ? 8
                        : 44,
                    }}
                  >
                    <View style={styles.avatar}>
                      <Feather name="user" size={120} color="#333" />
                    </View>

                    <Text
                      style={{
                        ...styles.title,
                        marginBottom: dimensions > 450 ? 8 : 32,
                      }}
                    >
                      Реєстрація
                    </Text>

                    <TextInput
                      name="login"
                      value={values.login}
                      onChangeText={handleChange("login")}
                      onFocus={handleBlur("login")}
                      onBlur={() => {
                        touched.login = false;
                      }}
                      placeholder="Логін"
                      autoCapitalize="none"
                      style={{
                        ...styles.input,
                        backgroundColor: touched.login ? "#FFF" : "#F6F6F6",
                        borderColor: touched.login ? "#FF6C00" : "#E8E8E8",
                      }}
                    />
                    {touched.login && errors.login && (
                      <Text style={styles.errorMessage}>{errors.login}</Text>
                    )}

                    <TextInput
                      name="email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onFocus={handleBlur("email")}
                      onBlur={() => {
                        touched.email = false;
                      }}
                      placeholder="Адреса електронної пошти"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={{
                        ...styles.input,
                        backgroundColor: touched.email ? "#FFF" : "#F6F6F6",
                        borderColor: touched.email ? "#FF6C00" : "#E8E8E8",
                      }}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                    <View
                      style={{
                        marginBottom: isKeyboardShown
                          ? 0
                          : dimensions > 450
                          ? 0
                          : 42,
                      }}
                    >
                      <TextInput
                        name="password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onFocus={handleBlur("password")}
                        onBlur={() => {
                          touched.password = false;
                        }}
                        placeholder="Пароль"
                        autoCapitalize="none"
                        secureTextEntry={isPasswordHidden}
                        style={{
                          ...styles.input,
                          backgroundColor: touched.password
                            ? "#FFF"
                            : "#F6F6F6",
                          borderColor: touched.password ? "#FF6C00" : "#E8E8E8",
                        }}
                      />
                      {touched.password && errors.password && (
                        <Text style={styles.errorMessage}>
                          {errors.password}
                        </Text>
                      )}

                      <TouchableOpacity
                        style={styles.inputShowPassword}
                        onPress={showHidePassword}
                      >
                        <Text style={styles.inputShowPasswordText}>
                          Показати
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={{
                        ...styles.button,
                        display: isKeyboardShown ? "none" : "flex",
                      }}
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonTitle}>Зареєструватися</Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        ...styles.textGroup,
                        display: isKeyboardShown ? "none" : "flex",
                      }}
                    >
                      <Text style={styles.text}>Вже є акаунт?</Text>
                      <TouchableOpacity
                        style={styles.margin}
                        onPress={() => navigation.navigate("Login")}
                      >
                        <Text style={styles.text}>Увійти</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
