import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as animalAPI from './animalAPI';

export const fetchAnimals = createAsyncThunk('animals/fetchAnimals', animalAPI.fetchAnimals);
export const createAnimal = createAsyncThunk('animals/createAnimal', animalAPI.createAnimal);
export const updateAnimal = createAsyncThunk('animals/updateAnimal', animalAPI.updateAnimal);
export const deleteAnimal = createAsyncThunk('animals/deleteAnimal', animalAPI.deleteAnimal);

const animalSlice = createSlice({
  name: 'animals',
  initialState: {
    data: { data: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Animals
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the entire response
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Animal
      .addCase(createAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.data.data.push(action.payload.data); // Add to the data array
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Animal
      .addCase(updateAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.data.findIndex(
          animal => animal._id === action.payload.data._id
        );
        if (index !== -1) {
          state.data.data[index] = action.payload.data;
        }
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Animal
      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.data.data = state.data.data.filter(
          animal => animal._id !== action.payload._id
        );
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default animalSlice.reducer; 