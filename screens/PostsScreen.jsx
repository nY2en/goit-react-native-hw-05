import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="logout" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.user}>
          <Image style={styles.userPhoto} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.userEmail}>User Email</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.photo }} style={styles.cardPhoto} />
              <Text style={styles.cardName}> {item.name}</Text>
              <View style={styles.cardInfo}>
                <TouchableOpacity>
                  <FontAwesome
                    name="comment-o"
                    size={24}
                    color="#BDBDBD"
                    style={styles.cardIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.cardInfo}>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.cardLocation}> {item.location}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: "flex-end",
    marginBottom: 32,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 8,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  main: {
    paddingHorizontal: 16,

    paddingBottom: 200,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  userName: {
    fontFamily: "Roboto500",
    fontSize: 13,

    color: "#212121",
  },

  userEmail: {
    fontFamily: "Roboto400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "pink",
    borderRadius: 25,
  },

  card: {
    marginBottom: 32,
  },

  cardPhoto: {
    height: 240,
    marginBottom: 8,
    borderRadius: 10,
  },

  cardName: {
    marginBottom: 8,

    fontFamily: "Roboto500",
    fontSize: 16,
    color: "#212121",
  },

  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardIcon: {
    marginLeft: 8,
  },

  cardLocation: {
    fontFamily: "Roboto500",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
