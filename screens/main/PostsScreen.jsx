import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen, CommentsScreen, MapsScreen } from "../nested";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultPostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Maps"
        component={MapsScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};
