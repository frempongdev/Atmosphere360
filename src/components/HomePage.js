import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  clearResults,
  fetchCity,
} from '../../redux/geolocation/GeolocationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetctWeather} from '../../redux/weather/weatherSlice';
import Geolocation from 'react-native-geolocation-service';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  const {city} = useSelector(state => state.city);
  const {weatherDetails} = useSelector(state => state.weather);

  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    dispatch(fetctWeather(coordinates));
  }, [coordinates, dispatch]);

  const handleInputChange = newValue => {
    if (newValue.includes('.')) {
      const valueArr = newValue.split(',');
      setCoordinates(valueArr);
    }
    setInputValue(newValue);
    dispatch(fetchCity(newValue));
  };

  const handleCitySelect = ct => {
    setInputValue('');
    dispatch(clearResults());
    setCoordinates([ct.lat, ct.lon]);
    setInputValue(`${ct?.name}, ${ct?.country}`);
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
          placeholderTextColor="rgb(15 57 147)"
          style={[styles.input, styles.centre]}
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <View style={[styles.resultsContainer, styles.centre]}>
          {city.length > 0 && (
            <FlatList
              data={city}
              renderItem={({item}) => (
                <TouchableHighlight onPress={() => handleCitySelect(item)}>
                  <Text
                    style={
                      styles.resultsCity
                    }>{`${item?.name}, ${item.country}`}</Text>
                </TouchableHighlight>
              )}
              keyExtractor={item => item.lat}
            />
          )}
        </View>
        {weatherDetails?.name && (
          <View style={[styles.displayArea, styles.centre]}>
            <Text
              style={[
                styles.cityName,
                styles.centre,
                styles.cBlue,
              ]}>{`${weatherDetails?.name}, ${weatherDetails?.sys?.country}`}</Text>
            <View style={styles.weatherDetails}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherDetails?.weather[0]?.icon}@4x.png`,
                }}
                style={[styles.icon, styles.centre]}
              />
              <Text style={[styles.description, styles.centre, styles.cBlue]}>
                {weatherDetails?.weather[0]?.description}
              </Text>
              <View style={styles.downDetails}>
                <Text style={[styles.degree, styles.cWhite]}>
                  {Math.round(weatherDetails?.main?.temp - 273)}°
                </Text>
                <View style={styles.rightDetails}>
                  <View style={styles.rightDetail}>
                    <Text
                      style={[styles.humidity, styles.centre, styles.cWhite]}>
                      {weatherDetails?.main?.humidity}%
                    </Text>
                    <Text style={[styles.centre, styles.cBlue]}>Humidity</Text>
                  </View>
                  <View style={styles.rightDetail}>
                    <Text
                      style={[styles.humidity, styles.centre, styles.cWhite]}>
                      {weatherDetails?.wind?.speed} m/s
                    </Text>
                    <Text style={[styles.centre, styles.cBlue]}>
                      Wind Speed
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centre: {
    alignSelf: 'center',
  },
  cBlue: {
    color: 'rgb(15 57 147)',
  },
  cWhite: {
    color: 'white',
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
    marginBottom: 25,
  },
  resultsContainer: {
    zIndex: 99,
    position: 'absolute',
    top: 80,
    flexDirection: 'row',
    width: '50%',
  },
  resultsCity: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  cityName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  icon: {
    width: 120,
    height: 90,
  },
  description: {
    marginBottom: 20,
  },
  downDetails: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: 0.5,
    borderTopColor: 'white',
  },
  degree: {
    fontSize: 90,
  },
  humidity: {
    fontSize: 18,
  },
  rightDetails: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  rightDetail: {
    marginBottom: 7,
  },
});

export default HomePage;
