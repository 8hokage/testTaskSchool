import { ISchoolBoy } from "../types/general";
import { BASE_ENDPOINT } from "./baseEndpoint";

export interface IGetStudentsResponse {
  Items: ISchoolBoy[];
  Quantity: number;
}

export const getStudents = async (classKey: number): Promise<IGetStudentsResponse> => {
  const res = await fetch(`${BASE_ENDPOINT}/v1/${classKey}/Schoolboy`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch students');
  }

  const parsedData = await res.json();
  return parsedData;
}