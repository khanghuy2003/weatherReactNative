import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native"
import Home from "./Screen/Home";
import ViewWeather from "./Screen/ViewWeather";
import { RootStackParamList } from "./Screen/type";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="ViewWeather" component={ViewWeather}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App