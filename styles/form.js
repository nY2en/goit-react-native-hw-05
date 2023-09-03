import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",

    resizeMode: "cover",

    backgroundColor: "#333",
  },

  form: {
    position: "relative",
    paddingTop: 92,
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  avatar: {
    position: "absolute",
    flex: 1,
    top: -60,
    left: "50%",
    transform: [{ translateX: -45 }],
    width: 120,
    height: 120,

    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },

  title: {
    fontFamily: "Roboto500",
    fontSize: 30,
    textAlign: "center",

    color: "#212121",
  },

  input: {
    marginBottom: 16,
    padding: 16,

    fontFamily: "Roboto400",
    fontSize: 16,

    borderWidth: 1,
    borderRadius: 10,

    backgroundColor: "#F6F6F6",
  },

  inputShowPassword: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  inputShowPasswordText: {
    fontFamily: "Roboto400",
    fontSize: 16,

    color: "#1B4371",
  },

  errorMessage: {
    paddingBottom: 12,

    fontFamily: "Roboto400",
    fontSize: 16,

    color: "red",
  },

  button: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,

    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },

  buttonTitle: {
    fontFamily: "Roboto400",
    fontSize: 16,
    textAlign: "center",

    color: "#FFF",
  },

  text: {
    fontFamily: "Roboto400",
    fontSize: 16,
    textAlign: "center",

    color: "#1B4371",
  },

  textGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  margin: {
    marginLeft: 4,
  },
});

export default styles;
