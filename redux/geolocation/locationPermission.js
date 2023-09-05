import {createAsyncThunk} from '@reduxjs/toolkit';
import React from 'react';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = createAsyncThunk(async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Atmosphere360 Location Permission',
          message:
            'Atmospere360 wants access to your location ' +
            'so you can accurate weather.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
});

export default requestLocationPermission;
