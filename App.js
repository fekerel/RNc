// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import getWeather from './getWeather'; // Hava durumu fonksiyonumuzu dahil ediyoruz

export default function App() {
    const [cityName, setCityName] = useState(''); // Kullanıcının girdiği şehir adı
    const [weatherData, setWeatherData] = useState(null); // Hava durumu verisi

    // Butona basıldığında hava durumunu getiren işlev
    const handleGetWeather = async () => {
        try {
            const data = await getWeather(cityName); // getWeather fonksiyonunu çağırıyoruz
            if (data && data.data) {
                setWeatherData(data.data); // API’den gelen hava durumu verisini kaydediyoruz
            } else {
                Alert.alert("Hata", "Hava durumu verisi bulunamadı.");
            }
        } catch (error) {
            console.error("Frontend error:", error);
            Alert.alert("Hata", "Hava durumu alınamadı. Lütfen tekrar deneyin.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Hava Durumu Uygulaması</Text>
            <TextInput
                style={styles.input}
                placeholder="Şehir adını girin"
                onChangeText={(text) => setCityName(text)}
                value={cityName}
            />
            <Button title="Hava Durumunu Al" onPress={handleGetWeather} />
            
            {weatherData && weatherData.current && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.locationText}>
                        {weatherData.location.name}, {weatherData.location.country}
                    </Text>
                    <Image
                        style={styles.weatherIcon}
                        source={{ uri: weatherData.current.weather_icons[0] }}
                    />
                    <Text style={styles.temperature}>
                        {weatherData.current.temperature}°C
                    </Text>
                    <Text style={styles.description}>
                        {weatherData.current.weather_descriptions[0]}
                    </Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Hissedilen: {weatherData.current.feelslike}°C</Text>
                        <Text style={styles.infoText}>Nem: {weatherData.current.humidity}%</Text>
                        <Text style={styles.infoText}>Rüzgar: {weatherData.current.wind_speed} km/h {weatherData.current.wind_dir}</Text>
                        <Text style={styles.infoText}>Görüş Mesafesi: {weatherData.current.visibility} km</Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    weatherContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 20,
    },
    locationText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ff4500',
        marginBottom: 10,
    },
    description: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
    },
    infoContainer: {
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
});
