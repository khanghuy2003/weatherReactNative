import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { API_KEY, Province, RootStackParamList } from "./type"

type HomeProps = NativeStackScreenProps<RootStackParamList,"Home">

const Home = ({navigation} : HomeProps ) => {


    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Province[]>([]);
    
    const getProvince = async () => {
        try {
            const response = await fetch(`http://dataservice.accuweather.com/locations/v1/adminareas/VN?apikey=${API_KEY}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getProvince();
    }, []);



    return (
        <ImageBackground
            source={require('../picture/sky.png')}
            style={styles.container}
        >
            {isLoading ? (
                <ActivityIndicator size="large" color="#ff6347" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ ID }) => ID.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ViewWeather', {province : item})
                        }}>
                            <View style={styles.card}>
                                <Text style={styles.text}>{item.LocalizedName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      alignItems: "center", // Căn giữa theo chiều ngang
    },
    card: {
      flexDirection: "row",
      padding: 15,
      marginBottom: 10,
      borderRadius: 3,
      backgroundColor: "#fff",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      width: "90%", // Hoặc maxWidth: 300 để giới hạn chiều rộng
      justifyContent: "center",
      marginLeft:20
    },
    text: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
    },
});


export default Home