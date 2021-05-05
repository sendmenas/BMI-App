## Description

App consist of three steps:

- Enter your name
- Enter your wight
- Enter your height
  You can choose the metric system for data.

After submitting these metrics you will get the calculation of your BMI.
Addition data will be displayed in the dev tools console - time spent, visit count and selected metric system.

## Before start

Clone project.\
Run `yarn install` in root folder

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn deploy`

Builds the app for production to the `build` folder and deploy it to Github pages [https://sendmenas.github.io/bmi-app/](https://sendmenas.github.io/bmi-app/).

### `Future updates`

- Add possibility to set gender, age, body type and ect.
- Add explanation of what would be a good BMI (in case of a bad results), what weight is recommended.
- Add additional formulas for BMI calculation. Add possibility to select country, as it might vary based on it as well.
- Current tracking should be changed as well, saving such data in browser will not help marketing :) probably Google Analytics is a better choice
