// const getWeather = async (areaName) => {
//     const url = `http://api.weatherstack.com/current?access_key=798ab87b094c6142cf077cf31314ed19&query=${areaName}`;
//     const options = {
//         method: 'GET'
//     };
//     try {
//         const response = await fetch(url, options);
//         const data = await response.json();
//         if (data.error) {
//             throw new Error(data.error.info);
//         } else {
//             const placeName = data.location.name;
//             const forecastSummary = data.current.weather_descriptions[0];
//             const forecastPrecip = `%${data.current.precip} chance of rain.`;
//             const finalMessage = `${placeName}: ${forecastSummary}. ${forecastPrecip}`;
//             return finalMessage;
//         }
//     } catch (error) {
//         console.error('Unable to connect to weather service!', error);
//         return 'Unable to connect to weather service!';
//     }
// };

// export default getWeather;


const getWeather = async (areaName) => {
    const url = 'https://03ff-31-223-44-164.ngrok-free.app/api/weather/' + areaName;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Yanıtı JSON formatında işleyin
        const result = await response.json();

        console.log('oldu iste')

        return result;
    } catch (error) {
        console.error('API error:', error);
        alert("Hava durumu alınamadı. Bağlantıyı kontrol edin.");
    }
};
    

export default getWeather;