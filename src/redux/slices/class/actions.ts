import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLessons } from "../../../api/getLessons";
import { getRate } from "../../../api/getRate";
import { getStudents } from "../../../api/getStudents";

export const fetchClassData = createAsyncThunk('class/fetchClassData', async (classKey: number) => {
  const [schoolboys, lessons, rate] = await Promise.all([
    getStudents(classKey), getLessons(classKey), getRate(classKey),
  ]).catch((e) => {
    throw new Error('Failed to fetch class data');
  });
 
  return {
    schoolboys: schoolboys.Items,
    lessons: lessons.Items,
    rate: rate.Items,
  }
});
