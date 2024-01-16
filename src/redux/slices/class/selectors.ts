import { IState } from "../../store";

export const schoolboysSelector = (state: IState) => {
  return state.class.schoolboys;
};

export const lessonSelector = (state: IState) => {
  return state.class.lessons;
}
export const loadingSelector = (state: IState) => {
  return state.class.loading;
}
