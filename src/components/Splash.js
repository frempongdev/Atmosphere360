import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Splash = () => {
  const name = 'Atmosphere360';

  return (
    <View style={style.logoWrapper}>
      <Text style={style.logoText}>{name}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  logoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b86e5',
  },
  logoText: {
    color: 'white',
    fontSize: 30,
  },
});

export default Splash;
