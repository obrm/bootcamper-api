import NodeGeocoder from 'node-geocoder';

// Fix bug that the geocoder is not able to pick up the environment variables
import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" });

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpdAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

export default geocoder;