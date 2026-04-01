const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/users');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));