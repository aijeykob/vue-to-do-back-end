require('dotenv').config();
CONFIG = {};
CONFIG.PORT = process.env.PORT || '3000';
CONFIG.DB_USER = process.env.DB_USER || 'dbUser';
CONFIG.DB_PASSWORD = process.env.DB_PASSWORD || '';
CONFIG.DB_CLUSTER = process.env.DB_CLUSTER || '';
