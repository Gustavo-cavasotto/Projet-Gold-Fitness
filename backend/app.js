const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dietRoutes = require('./routes/dietRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diet', dietRoutes);
app.use('/api/workout', workoutRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
