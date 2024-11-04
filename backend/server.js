require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const weatherRoutes = require('../routes/weatherRoutes');

// Middleware
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Rotalar
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
