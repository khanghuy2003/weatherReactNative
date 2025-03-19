import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { API_KEY, DuBaoThoiTiet, RootStackParamList, weatherIcons } from "./type"

type ViewWeatherProps = NativeStackScreenProps<RootStackParamList,"ViewWeather">

const ViewWeather = ({navigation , route} : ViewWeatherProps ) => {

    const [LocationKey,setLocationKey] = useState('')
    const [CityName,setCityName] = useState('')

    const [nhietDo,setNhietDo] = useState('')
    const [nhietDoF,setNhietDoF] = useState('')
    const [thoiTiet,setThoiTiet] = useState('')

    const [loadingNhietDo,setLoadingNhietDo] = useState(true)
    const [loadingNhietDoF,setLoadingNhietDoF] = useState(true)

    const [loadingImage1,setLoadingImage1] = useState(true)
    const [loadingImage2,setLoadingImage2] = useState(true)
    const [loadingImage3,setLoadingImage3] = useState(true)

    const [DuBaoChung,setDuBaoChung] = useState('')
    const [NhietDoCaoNhat,setNhietDoCaoNhat] = useState('')
    const [NhietDoThapNhat,setNhietDoThapNhat] = useState('')
    const [MoTaBanNgay,setMoTaBanNgay] = useState('')
    const [MoTaBanDem,setMoTaBanDem] = useState('')
    const [KhaNangMuaBanNgay,setKhaNangMuaBanNgay] = useState(false)
    const [KhaNangMuaBanDem,setKhaNangMuaBanDem] = useState(false)

    const [iconNumber1,setIconNumber1] = useState(0) 
    const [iconNumber2,setIconNumber2] = useState(0)
    const [iconNumber3,setIconNumber3] = useState(0)

    const [error,setError] = useState('')

    const {
            LocalizedName,
    } = route.params.province


    // Hàm chuẩn hóa tên tỉnh
    const formatString = (name: string) => {
        return name
            .normalize("NFD") 
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D") 
            .replace(/\s+/g, "") 
            .toLowerCase(); 
    };


    useEffect(()=>{
        const formattedName = formatString(LocalizedName);
        setCityName(formattedName);
        console.log("CityName updated:", formattedName);
    },[LocalizedName])


    useEffect(() => {
        if (CityName) {
            const getLocationKey = async () => {
                try {
                    const URL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${CityName}`;
                    console.log("Fetching URL:", URL);

                    const response = await fetch(URL);
                    const data = await response.json();

                    if (data.length > 0) {
                        setLocationKey(data[0].Key);
                        console.log("Location Key:", data[0].Key);
                    } else {
                        setError('Không tìm thấy thành phố.')
                    }
                } catch (error) {
                    setError("Lỗi khi lấy LocationKey:")
                }
            };

            getLocationKey();
        }
    }, [CityName]);

    useEffect(()=>{
        const getCurrentCondition = async () => {

            if (!LocationKey) {
                setError("Không lấy được LocationKey!");
                return;
            }

            if(LocationKey){
                const URL = `http://dataservice.accuweather.com/currentconditions/v1/${LocationKey}?apikey=${API_KEY}&language=vi-vn`
                const response = await fetch(URL)
                const data = await response.json()
                if(data.length>0){
                    setNhietDo(data[0].Temperature.Metric.Value.toString())
                    setNhietDoF(data[0].Temperature.Imperial.Value.toString())
                    setThoiTiet(data[0].WeatherText.toString())

                    setIconNumber1(data[0].WeatherIcon.toString())
                    
                    setLoadingNhietDo(false)
                    setLoadingNhietDoF(false)
                    setLoadingImage1(false)

                    setError('')
                }else{
                    setError(`Data null`)
                }
            }else{
                setError('Không lấy được LocationKey!')
            }
        }

        getCurrentCondition()
    },[LocationKey])

    useEffect(()=>{
        const getDuBaoTHoiTiet = async () => {
            if(!LocationKey){
                setError("Không có LocationKey")
                return
            }
            
            try {
                const URL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LocationKey}?apikey=${API_KEY}&language=vi-vn&metric=true`
                const response = await fetch(URL)
                const data : DuBaoThoiTiet = await response.json()

                setDuBaoChung(data.Headline.Text.toString())
                setNhietDoCaoNhat(data.DailyForecasts[0].Temperature.Maximum.Value.toString())
                setNhietDoThapNhat(data.DailyForecasts[0].Temperature.Minimum.Value.toString())
                setMoTaBanNgay(data.DailyForecasts[0].Day.IconPhrase)
                setMoTaBanDem(data.DailyForecasts[0].Night.IconPhrase)
                setKhaNangMuaBanNgay(data.DailyForecasts[0].Day.HasPrecipitation)
                setKhaNangMuaBanDem(data.DailyForecasts[0].Night.HasPrecipitation)

                setIconNumber2(data.DailyForecasts[0].Day.Icon)
                setIconNumber3(data.DailyForecasts[0].Night.Icon)

                setLoadingImage2(false)
                setLoadingImage3(false)

            } catch (error) {
                setError("Không thể tải dữ liệu thời tiết. Vui lòng thử lại!");
            }
        }

        getDuBaoTHoiTiet()
    },[LocationKey])


    return (
        <ImageBackground
            source={require('../picture/sky2.png')}
            style={styles.container}
            resizeMode="cover"
        >
            {/* Tên thành phố */}
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.cityName}>{LocalizedName}</Text>
            </View>

            {/* Ảnh biểu tượng thời tiết lớn */}
            {
                (loadingImage1)
                ?
                <ActivityIndicator
                    size={'large'}
                    color={"#ffffff"}/>
                :
                <Image 
                    source={weatherIcons[iconNumber1] || weatherIcons[1]} 
                    style={styles.weatherLargeIcon} 
                    resizeMode="contain"/>
            }
            

            {/* Dự báo thời tiết */}
            <Text style={styles.thoiTiet}>{thoiTiet}</Text>

            {/* View chứa nhiệt độ C và F */}
            <View style={styles.tempContainer}>
                {/* Độ C */}
                    {
                        (loadingNhietDo)
                    ?
                        <ActivityIndicator
                            size={'large'}
                            color={'#ffffff'}
                            style={{marginRight:70}}
                        />
                    :
                        <View style={styles.tempBox}>
                            <Text style={styles.tempValue}>{nhietDo}</Text>
                            <Text style={styles.degreeSymbol}>°C</Text>
                        </View>
                    }
                {/* Đường phân cách */}
                <View style={styles.separator} />
                {/* Độ F */}
                    {
                        (loadingNhietDoF)
                    ?
                        <ActivityIndicator
                            size={'large'}
                            color={'#ffffff'}
                            style={{marginLeft:70}}
                        />
                    :
                        <View style={styles.tempBox}>
                            <Text style={styles.tempValue}>{nhietDoF}</Text>
                            <Text style={styles.degreeSymbol}>°F</Text>
                        </View>
                    }
                    
            </View>

            {/* Du bao thoi tiet */}
            <View style={styles.forecastContainer}>
                <Text style={styles.forecastTitle}>🌤 Dự báo chung:</Text>
                <Text style={styles.forecastText}>📌 {DuBaoChung}</Text>

                <Text style={styles.forecastTitle}>📅 Dự báo thời tiết ngày mai:</Text>
                
                {/* Nhiệt độ */}
                <View style={styles.temperatureRow}>
                    <Text style={styles.forecastLabel}>🌡 Nhiệt độ cao nhất:</Text>
                    <Text style={styles.forecastValue}>{NhietDoCaoNhat}°C</Text>
                </View>
                <View style={styles.temperatureRow}>
                    <Text style={styles.forecastLabel}>❄ Nhiệt độ thấp nhất:</Text>
                    <Text style={styles.forecastValue}>{NhietDoThapNhat}°C</Text>
                </View>

                {/* Thời tiết ban ngày */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.forecastTitle}>🌞 Ban ngày:</Text>
                        <Text style={styles.forecastLabel}>📜 Mô tả: {MoTaBanNgay}</Text>
                        <Text style={styles.forecastLabel}>☔ Khả năng mưa: {KhaNangMuaBanNgay ? 'Có' : 'Không'}</Text>
                    </View>
                    {
                        (loadingImage2)
                        ?
                        <ActivityIndicator
                            size={'large'}
                            color={'#ffffff'}
                            style={{marginRight:30}}
                        />
                        :
                        <Image source={weatherIcons[iconNumber2]} style={styles.weatherIcon} />
                    }
                    
                </View>

                {/* Thời tiết ban đêm */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <View>
                        <Text style={styles.forecastTitle}>🌙 Ban đêm:</Text>
                        <Text style={styles.forecastLabel}>📜 Mô tả: {MoTaBanDem}</Text>
                        <Text style={styles.forecastLabel}>☔ Khả năng mưa: {KhaNangMuaBanDem ? 'Có' : 'Không'}</Text>
                    </View>
                    {
                        (loadingImage3)
                        ?
                        <ActivityIndicator
                            size={'large'}
                            color={'#ffffff'}
                            style={{marginRight:30}}
                        />
                        :
                        <Image source={weatherIcons[iconNumber3]} style={styles.weatherIcon} />
                    }
                    
                </View>
            </View>

            {error!=null ? <Text style={styles.errorText}>{error}</Text> : null}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 48,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 20,
        width:'90%',
        justifyContent:'center'
    },
    tempBox: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    tempValue: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    degreeSymbol: {
        fontSize: 30,
        color: '#ffffff',
        marginLeft: 5,
    },
    separator: {
        width: 3,
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        opacity: 0.8,
    },
    thoiTiet: {
        fontSize: 48,
        color: '#ffffff',
        fontWeight: '300',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },
    image:{
        height:40,
        width:40,
        tintColor:'#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: { width: 2, height: 2 },
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forecastContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Nền trong suốt nhẹ
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 10,
        borderWidth: 0,
        borderColor: '#ffffff',
        width:'90%'
    },
    forecastTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    forecastText: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 10,
    },
    temperatureRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 5,
    },
    forecastLabel: {
        fontSize: 16,
        color: '#ffffff',
    },
    forecastValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700', // Màu vàng nổi bật
    },
    weatherLargeIcon: {
        width: 100,  // Điều chỉnh theo ý muốn
        height: 100, // Điều chỉnh theo ý muốn
        marginLeft: 10, // Khoảng cách với chữ
    },
    weatherIcon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 10, // Để cách một chút so với chữ
    },
    
})

export default ViewWeather