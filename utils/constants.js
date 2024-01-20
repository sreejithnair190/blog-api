const dotenv = require('dotenv');
dotenv.config();

module.exports.database = process.env.DATABASE_NAME;
module.exports.username = process.env.DATABASE_USERNAME;
module.exports.password = process.env.DATABASE_PASSWORD;
module.exports.host = process.env.DATABASE_HOST;

module.exports.jwt_secret = process.env.JWT_SECRET;
module.exports.jwt_expiry = process.env.JWT_EXPIRES_IN;