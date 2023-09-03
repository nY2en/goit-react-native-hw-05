import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import styles from "../styles/navigation";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <MainTab.Navigator
      name="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#fff",
        tabBarStyle: styles.bar,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),
          tabBarItemStyle: styles.item,
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
          tabBarItemStyle: styles.item,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarItemStyle: styles.item,
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
