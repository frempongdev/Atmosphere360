import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {fetchCity} from '../../redux/geolocation/GeolocationSlice';
import {useDispatch, useSelector} from 'react-redux';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');

  const {city} = useSelector(state => state.city);

  const dispatch = useDispatch();

  const handleInputChange = newValue => {
    // console.log(inputValue);
    setInputValue(newValue);
    dispatch(fetchCity(newValue));
  };

  return (
    <View style={styles.homeWrapper}>
      <Text style={[styles.headText, styles.centre]}>Atmospere360</Text>
      <View style={[styles.searchWrapper, styles.centre]}>
        <Text style={styles.infoText}>
          Please Enter a Coordinate(separated by comma(,)) or City
        </Text>
        <TextInput
          placeholder="ex.  48.75,2.32   OR   London"
          style={[styles.input, styles.centre]}
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <View>
          {city.length > 0 &&
            city.map(oneCity => {
              <Text>{oneCity.name}</Text>;
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centre: {
    alignSelf: 'center',
  },
  homeWrapper: {
    flex: 1,
    backgroundColor: '#5b86e5',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
  },
  headText: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 10,
    fontFamily: 'Trebuchet MS',
  },
  searchWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 50,
    textAlign: 'center',
    width: '80%',
  },
});
export default HomePage;
