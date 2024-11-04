const express = require('express');
const router = express.Router();
const WeatherQuery = require('../database/models/WeatherQuery');
const axios = require('axios');

// Hava durumu sorgusu
router.get('/:city', async (req, res) => {
    const cityName = req.params.city;

    try {
        // Veri tabanında kontrol et
        let weather = await WeatherQuery.findOne({ cityName });

        if (weather) {
            return res.json({ source: 'database', data: weather.data });
        }

        // API'den veri çek
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${cityName}`;
        const response = await axios.get(url);

        if (response.data.error) {
            return res.status(404).json({ error: 'City not found' });
        }

        // Veri tabanına kaydet
        weather = new WeatherQuery({
            cityName,
            data: response.data
        });
        await weather.save();

        res.json({ source: 'api', data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
