import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

export const CreatePostsCamera = ({ photo, setPhoto }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

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
    <View style={{ marginBottom: 32 }}>
      <View style={styles.cameraBlock}>
        <Camera style={styles.camera} ref={setCamera}>
          <TouchableOpacity style={styles.icon} onPress={takePhoto}>
            <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>

        {photo && <Image source={{ uri: photo }} style={styles.tookedPhoto} />}
      </View>

      <Text style={styles.text}>
        {photo ? "Редагувати фото" : "Завантажити фото"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraBlock: {
    height: 240,
    marginBottom: 8,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },

  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#fff",
    borderRadius: 50,
  },

  tookedPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: "100%",

    height: "100%",
  },
  text: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#BDBDBD",
  },
});
