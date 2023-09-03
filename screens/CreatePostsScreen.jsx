import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
} from "react-native";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    setPhoto(photo.uri);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <AntDesign name="arrowleft" size={32} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Створити публікацію</Text>
        </View>
        <View style={styles.main}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.tookedPhoto}>
                <Image soure={{ uri: photo }} />
              </View>
            )}
            <TouchableOpacity style={styles.icon} onPress={takePhoto}>
              <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <Formik
            initialValues={{ name: "", location: "" }}
            onSubmit={(values, { resetForm }) => {
              const newPost = {
                ...values,
                photo,
              };
              console.log(newPost);

              navigation.navigate("Posts", newPost);
              resetForm();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <View>
                <TextInput
                  name="name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  placeholder="Назва..."
                  style={{ ...styles.input, marginBottom: 16 }}
                ></TextInput>
                <TextInput
                  name="location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  placeholder="Місцевість..."
                  style={{ ...styles.input, marginBottom: 32 }}
                ></TextInput>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Опублікувати</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  headerTitle: {
    marginLeft: 64,

    fontFamily: "Roboto500",
    fontSize: 17,
  },

  main: {
    position: "relative",
    paddingHorizontal: 16,
  },

  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },

  icon: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  tookedPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: "100%",
    // pointerEvents: "none",
  },

  input: {
    paddingVertical: 16,

    fontFamily: "Roboto400",
    fontSize: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  button: {
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
});
