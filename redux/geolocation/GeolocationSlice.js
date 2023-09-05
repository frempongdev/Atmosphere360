const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  city: [],
  isLoading: false,
};
export const fetchCity = createAsyncThunk('fetch/fetchCity', async input => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=9583bb633d5cf94f2e5e30b43314a8b9`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    clearResults: state => {
      state.city = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCity.pending, state => ({...state, isLoading: true}))
      .addCase(fetchCity.fulfilled, (state, {payload}) => ({
        ...state,
        isLoading: false,
        city: payload,
      }))
      .addCase(fetchCity.rejected, state => ({...state, isLoading: false}));
  },
});

export const {clearResults} = geolocationSlice.actions;
export default geolocationSlice.reducer;
