import { BASE_ENDPOINT } from "./baseEndpoint";

export const setUnRate = async (classKey: number, schoolboyId: string, lessonId: string) => {
  const res = await fetch(`${BASE_ENDPOINT}/v1/${classKey}/UnRate`, {
    method: 'POST',
    body: JSON.stringify({
      ColumnId: lessonId,
      SchoolboyId: schoolboyId,
    })
  });

  if (!res.ok) {
    throw new Error('Failed to unrate');
  }

  return res;
}