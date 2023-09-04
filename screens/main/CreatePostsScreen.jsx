import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { CreatePostsCamera } from "../../components";

export const CreatePostsScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, [photo]);

  const navigation = useNavigation();

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
          <CreatePostsCamera
            photo={photo}
            setPhoto={setPhoto}
            setLocation={setLocation}
          />
          <Formik
            initialValues={{ name: "", location: "" }}
            onSubmit={(values, { resetForm }) => {
              const newPost = {
                ...values,
                ...location,
                photo,
              };

              navigation.navigate("Default", newPost);
              setPhoto(null);
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
                  style={{
                    ...styles.input,
                    marginBottom: 32,
                  }}
                ></TextInput>

                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                  }}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                  disabled={!photo}
                >
                  <Text style={styles.buttonTitle}>Опублікувати</Text>
                </TouchableOpacity>

                <View style={styles.buttonDeleteContainer}>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    activeOpacity={0.8}
                    onPress={() => setPhoto(null)}
                  >
                    <AntDesign name="delete" size={32} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 40,
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
  },

  buttonTitle: {
    fontFamily: "Roboto400",
    fontSize: 16,
    textAlign: "center",

    color: "#FFF",
  },

  buttonDeleteContainer: {
    flexDirection: "row",
    justifyContent: "center",

    marginTop: 80,
  },

  buttonDelete: {
    width: 70,
    height: 44,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 25,

    backgroundColor: "#F6F6F6",
  },
});
