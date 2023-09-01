import {configureStore} from '@reduxjs/toolkit';
import geolocationReducer from './geolocation/GeolocationSlice';
import weatherReducer from './weather/weatherSlice';

const store = configureStore({
  reducer: {
    city: geolocationReducer,
    weather: weatherReducer,
  },
});

export default store;
