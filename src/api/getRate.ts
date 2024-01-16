import { IRate } from "../types/general";
import { BASE_ENDPOINT } from "./baseEndpoint";

interface IGetRateResponse {
  Items: IRate[];
  Quantity: number;
}

export const getRate = async (classKey: number, studentId?: number): Promise<IGetRateResponse> => {
  const queryParams = studentId ? `?SchoolboyId=${studentId}` : ''

  const res = await fetch(`${BASE_ENDPOINT}/v1/${classKey}/Rate${queryParams}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch rate');
  }

  const parsedData = await res.json();
  return parsedData;
}