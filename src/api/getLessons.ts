import { ILesson } from "../types/general";
import { BASE_ENDPOINT } from "./baseEndpoint";

export interface IGetLessonsResponse {
  Items: ILesson[],
  Quantity: number
}

export const getLessons = async (classKey: number): Promise<IGetLessonsResponse> => {
  const res = await fetch(`${BASE_ENDPOINT}/v1/${classKey}/Column`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch lessons');
  }

  const parsedData = await res.json();
  return parsedData;
}