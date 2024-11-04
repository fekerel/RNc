const mongoose = require('mongoose');

const weatherQuerySchema = new mongoose.Schema({
    cityName: String,
    data: Object, // Hava durumu verileri
    queriedAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 saat sonra silinsin
    }
});

module.exports = mongoose.model('WeatherQuery', weatherQuerySchema);
