import { System } from "../components/App";

/* Naidota formulė, kartu su "nuosprendžiu", yra paimta iš WHO puslapio. Tai šia vietą galima praplėsti taikant ją pagal atskirų šalių metodikas */
export const calculateBmi = (
  height: number,
  weight: number,
  system: System
): number => {
  if (system === System.Metric) {
    return weight / Math.pow(height / 100, 2);
  }
  return (weight * 703) / Math.pow(height, 2);
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

  return `${name}, your BMI is ${bmi.toFixed(2)} - ${status}`;
};
