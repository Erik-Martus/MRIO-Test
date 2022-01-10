# Front End Developer Exercise

---

## Get Started

**Install dependencies:**

```sh
npm install
```

**Run application:**

```sh
npm start
```

**Run tests:**

```sh
npm run test
```

**Production build:**

```sh
npm run build
```

_Note:_ outputs to `/dist` directory.

---

## Usage

- The 'All' tab displays all orders.
- The 'Shipped' tab displays only orders with a status of 'Shipped'.
- Click on any column heading to sort by that column and toggle between ascending and descending order.

---

## Technologies

- React
- Typescript
- Node.js
- HTML/CSS
- SASS
- Redux
- Jest
- Webpack
  - Code compilation and bundling
  - Used to build development environment
- ESLint & Prettier
  - Code formatting and linting
  - Used to catch errors and enforce code styling during development
- MUI
  - React community library for Material UI
  - Used per instruction recommendation
- Moment.js
  - Format dates and times
  - Used to reformat dates from data to desired format in design mockup

---

## Directory Structure

- `root` - contains configuration files
  - `public` - static files
  - `src` - application source files
    - `components` - React component files
    - `data` - data files
    - `store` - Redux store files
      - `slices` - Redux reducer slices
    - `styles` - SASS files

---

## About the Project

- This application is built using the MUI React Library (npm: `@mui/material`) which has replaced the Material-UI React Library (npm: `@material-ui/core`).
- Data used by the application is stored in a JSON file located at `src/data/data.json` and is imported into the Redux store via the order slice located at `src/store/slices/orderSlice.ts`
- In the `__test__` directory the file `testData.json` is a copy of the aforementioned data file. It is included there under the assumption that in a production environment data used in this application would be pulled from a database or other external source rather than a local static file. By including the test data file, future testing would be consistently use the same dataset regardless of updates to the live database.
