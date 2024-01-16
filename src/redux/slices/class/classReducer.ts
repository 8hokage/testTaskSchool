import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudents } from '../../../api/getStudents';
import { getLessons } from '../../../api/getLessons';
import { getRate } from '../../../api/getRate';
import { ILesson, ISchoolBoy } from '../../../types/general';
import { fetchClassData } from './actions';

export interface ISchoolBoyWithRates extends Record<string, string> {
  fullName: string;
  id: string;
}

export interface IClassState {
  schoolboys: Record<string, ISchoolBoyWithRates>,
  lessons: Record<string, ILesson>,
  loading: boolean,
}

export const initialState: IClassState = {
  schoolboys: {},
  lessons: {},
  loading: true,
}

export const classSlice = createSlice({
  name: 'class',
  initialState: initialState,
  reducers: {
    setRateImmidiate: (state, action) => {
      state.schoolboys[action.payload.schoolboyId][action.payload.lessonTitle] = 'Н';
    },
    setUnRateImmidiate: (state, action) => {
      state.schoolboys[action.payload.schoolboyId][action.payload.lessonTitle] = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassData.fulfilled, (state, action) => {
        const { schoolboys, lessons, rate } = action.payload;

        const newSchoolboys: Record<string, ISchoolBoyWithRates> = {};
        const newLessons: Record<string, ILesson> = {};

        const lessonsMapForRate: Record<string, string> = {};
        
        lessons.forEach((item) => {
          newLessons[item.Id] = item;
          lessonsMapForRate[item.Title] = '';
        });

        schoolboys.forEach((item) => {
          const nameParts = [item.LastName, item.SecondName, item.FirstName].filter((item) => item !== null);
          const fullName = nameParts.join(' ');

          newSchoolboys[item.Id] = {
          id: item.Id,
          fullName,
          ...lessonsMapForRate,
        }});

        rate.forEach((item) => {
          newSchoolboys[item.SchoolboyId][newLessons[item.ColumnId].Title] = item.Title;
        });

        state.lessons = newLessons;
        state.schoolboys = newSchoolboys;

        state.loading = false;
      })
  },
});


export const { setRateImmidiate, setUnRateImmidiate } = classSlice.actions;
export default classSlice.reducer;