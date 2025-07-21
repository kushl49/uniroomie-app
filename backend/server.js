const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

// You can later add: app.use('/api/listings', require('./routes/listingRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
