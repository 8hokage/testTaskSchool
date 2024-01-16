export interface ISchoolBoy {
  Id: string;
  FirstName: string;
  SecondName: string;
  LastName: string;
}

export interface ILesson {
  Id: string;
  Title: string;
}

export interface IRate {
  Id: string;
  SchoolboyId: string;
  ColumnId: string;
  Title: string;
}


