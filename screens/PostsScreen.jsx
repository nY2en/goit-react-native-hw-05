import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "flex-end",
          paddingTop: 42,
          paddingBottom: 16,
          paddingHorizontal: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="logout" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>PostsScreen</Text>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
