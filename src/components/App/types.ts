export enum System {
  Metric = "metric",
  Imperial = "imperial",
}

export type FormVals = {
  system: System;
  name: string;
  height: number;
  weight: number;
};
