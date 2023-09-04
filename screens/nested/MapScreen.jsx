import { View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export const MapsScreen = ({ route }) => {
  const { params } = route;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: params.params.latitude,
          longitude: params.params.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: params.params.latitude,
            longitude: params.params.longitude,
          }}
        />
      </MapView>
    </View>
  );
};
