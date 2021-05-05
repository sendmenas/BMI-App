import "./App.css";
import { useState, useEffect } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { InputWrapper } from "../InputWrapper";
import { ValuesTable } from "../ValuesTable";
import {
  calculateBmi,
  getMessage,
  getTimeString,
  updateVisitCounter,
  getCount,
  getHeight,
  getWeight,
} from "../../heplers";
import { FormVals, System } from "./types";

const initialValues = {
  system: System.Metric,
  name: "",
  height: 0,
  weight: 0,
};

export const App = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(Date.now());
    updateVisitCounter();
  }, []);

  const handleNext = () => setStep((step) => step + 1);
  const handleBack = () => setStep((step) => step - 1);
  const handleSubmit = (vals: FormVals, actions: FormikHelpers<FormVals>) => {
    const { name, height, weight, system } = vals;
    actions.setSubmitting(false);
    const bmi = calculateBmi(height, weight, system);
    setMessage(getMessage(name, bmi));
    setStep((step) => step + 1);
  };
  const logData = () => {
    console.table({
      "Time elapsed": getTimeString((Date.now() - time) / 1000),
      Visits: getCount(),
    });
  };

  const isFirstStep = step === 1;
  const isSecondStep = step === 2;
  const isThirdStep = step === 3;
  const isFinished = step === 4;

  return (
    <section className="section">
      <h1 className="title">BMI App</h1>
      <main className="container">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <>
              <Form className="form">
                {isFirstStep && (
                  <InputWrapper
                    label="Name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onNext={handleNext}
                  />
                )}
                {isSecondStep && (
                  <InputWrapper
                    label={`Weight (${getWeight(values.system)})`}
                    name="weight"
                    type="number"
                    value={values.weight}
                    onChange={handleChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {isThirdStep && (
                  <InputWrapper
                    label={`Height (${getHeight(values.system)})`}
                    name="height"
                    type="number"
                    value={values.height}
                    onBack={handleBack}
                    onNext={logData}
                    onChange={handleChange}
                    hasSubmit={true}
                  />
                )}
                {!isFirstStep && !isFinished && (
                  <Field
                    component="select"
                    id="system"
                    name="system"
                    disabled={isFinished ? true : false}
                    className="select"
                  >
                    <option value="metric">metric</option>
                    <option value="imperial">imperial</option>
                  </Field>
                )}
              </Form>
              {isFinished && <p className="message">{message}</p>}
              <ValuesTable {...values} />
            </>
          )}
        </Formik>
      </main>
    </section>
  );
};
