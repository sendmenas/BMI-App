import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { InputWrapper } from "../InputWrapper";
import { calculateBmi, getMessage } from "../../heplers/calculateBmi";
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

  const handleNext = () => {
    setStep((step) => step + 1);
  };
  const handleBack = () => setStep((step) => step - 1);
  const handleSubmit = (vals: FormVals, actions: FormikHelpers<FormVals>) => {
    const { name, height, weight, system } = vals;
    actions.setSubmitting(false);
    const bmi = calculateBmi(height, weight, system);
    setMessage(getMessage(name, bmi));
    setStep((step) => step + 1);
  };

  const isFirstStep = step === 1;
  const isSecondStep = step === 2;
  const isThirdStep = step === 3;
  const isFinished = step === 4;

  // Galima praplėsti pasirinkimus pridedant lyties, amžiaus pasirinkimus
  return (
    <section className="section">
      <header>BMI App</header>
      <main>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form>
              <Field
                component="select"
                id="system"
                name="system"
                disabled={isFinished ? true : false}
              >
                <option value="metric">metric</option>
                <option value="imperial">imperial</option>
              </Field>
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
                  label={`Weight (${
                    values.system === System.Metric ? "kg" : "lbs"
                  })`}
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
                  label={`Height (${
                    values.system === System.Metric ? "cm" : "inches"
                  })`}
                  name="height"
                  type="number"
                  value={values.height}
                  onBack={handleBack}
                  onNext={() => console.log("stats")}
                  onChange={handleChange}
                  hasSubmit={true}
                />
              )}
            </Form>
          )}
        </Formik>
        {isFinished && <p>{message}</p>}
      </main>
    </section>
  );
};
