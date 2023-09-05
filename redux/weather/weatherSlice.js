const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  weatherDetails: {},
  isLoading: false,
};

export const fetctWeather = createAsyncThunk(
  'fetch,fetchWeather',
  async coord => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=cc885dd3877084c87abb1055d2ab813c`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetctWeather.pending, state => ({...state, isLoading: true}))
      .addCase(fetctWeather.fulfilled, (state, {payload}) => ({
        ...state,
        isLoading: false,
        weatherDetails: payload,
      }))
      .addCase(fetctWeather.rejected, state => ({...state, isLoading: false}));
  },
});

export default weatherSlice.reducer;
