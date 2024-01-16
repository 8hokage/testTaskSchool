import { BASE_ENDPOINT } from "./baseEndpoint";

export const setRate = async (classKey: number, schoolboyId: string, lessonId: string) => {

  const data = JSON.stringify({
    SchoolboyId: schoolboyId,
    ColumnId: lessonId,
    Title: 'Н'
  });

  const res = await fetch(`${BASE_ENDPOINT}/v1/${classKey}/Rate`, {
    method: 'POST',
    body: data,
  });

  if (!res.ok) {
    throw new Error('Failed to rate');
  }

  const parsedData = await res.json();
  return parsedData;
}