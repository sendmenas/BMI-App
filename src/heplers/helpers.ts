import { FormVals, System, initialValues } from "../components/App";

const storageKey = "count";
const storageValsKey = "vals";

export const calculateBmi = (
  height: number,
  weight: number,
  system: System = System.Metric
): number => {
  if (system === System.Metric) {
    return (weight / Math.pow(height / 100, 2)) | 0;
  }
  return ((weight * 703) / Math.pow(height, 2)) | 0;
};

export const getMessage = (name: string, bmi: number): string => {
  const statusMap = new Map([
    [bmi < 18.5, "Underweight"],
    [bmi >= 18.5 && bmi <= 24.9, "Normal weight"],
    [bmi >= 25.0 && bmi <= 29.9, "Pre-obesity"],
    [bmi >= 30.0 && bmi <= 34.9, "Obesity class I"],
    [bmi >= 35.0 && bmi <= 39.9, "Obesity class II"],
    [bmi > 40, "Obesity class III"],
  ]);
  const status = statusMap.get(true);
  const visitor = name.length > 0 ? name : "Stranger";

  return `${visitor}, your BMI is ${bmi.toFixed(2)} - ${status}`;
};

export const getTimeString = (seconds: number): string =>
  seconds <= 60
    ? `${seconds.toFixed()}s`
    : `${(seconds / 60).toFixed()}min ${(seconds % 60).toFixed()}s`;

export const updateVisitCounter = () => {
  const count = window.localStorage.getItem(storageKey);
  if (!count) {
    window.localStorage.setItem(storageKey, "1");
    return;
  }
  const updatedCount = (parseInt(count) + 1).toString();
  window.localStorage.setItem(storageKey, updatedCount);
};

export const getCount = (): string | null =>
  window.localStorage.getItem(storageKey);

export const getWeight = (system: System): string =>
  system === System.Metric ? "kg" : "lbs";

export const getHeight = (system: System) =>
  system === System.Metric ? "cm" : "inches";

export const saveDataToStorage = (vals: FormVals): void => {
  window.localStorage.setItem(storageValsKey, JSON.stringify(vals));
};

export const getDataFromStorage = (): FormVals => {
  const data = window.localStorage.getItem(storageValsKey);
  if (data) {
    return JSON.parse(data);
  }
  return initialValues;
};
