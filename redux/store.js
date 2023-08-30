import {configureStore} from '@reduxjs/toolkit';
import geolocationReducer from './geolocation/GeolocationSlice';
const store = configureStore({
  reducer: {
    city: geolocationReducer,
  },
});

export default store;
