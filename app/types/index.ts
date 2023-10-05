export interface ISchool {
  id?: string;
  name?: string;
}

export interface IInstructor {
  id?: string;
  school: ISchool;
  first_name: string;
  last_name: string;
  age: number;
  profile_image_url: string;
}
