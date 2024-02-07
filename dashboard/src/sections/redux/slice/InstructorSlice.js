import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  instructor: [],
};

export const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    instructor: (state, action) => {
      state.instructor.push(action.payload);
    },
  },
});

export const { instructor } = instructorSlice.actions;

export default instructorSlice.reducer;
