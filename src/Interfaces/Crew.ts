export interface Crew {
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
  status: Status;
  id: string;
}

export enum Status {
  Active = "active",
}
