# React Chart Analysis

A React-based dashboard application for analyzing and visualizing chart data with interactive point details. Built with TypeScript, Redux, and Chart.js.

## Features

- 📊 Interactive chart visualization using Chart.js
- 📈 Dashboard with lessons summary
- 🔍 Detailed point data analysis
- 🎨 Modern, responsive UI
- 🔄 Redux state management
- 🧪 Comprehensive test coverage

## Tech Stack

- **React** 18.2.0 - UI library
- **TypeScript** 4.7.3 - Type safety
- **Redux** 4.2.0 - State management
- **Chart.js** 3.8.0 & **react-chartjs-2** 4.2.0 - Chart visualization
- **React Router** 6.3.0 - Routing
- **CRACO** 7.1.0 - Custom React App Configuration
- **Jest** & **React Testing Library** - Testing

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd React-Chart-Analysis
```

2. Install dependencies:
```bash
npm install
```

**Note:** If you encounter peer dependency conflicts, you can use:
```bash
npm install --legacy-peer-deps
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── chartAndLessonsSummary/
│   │   ├── dropDownListContent.tsx
│   │   └── header.tsx
│   ├── pointData/          # Point data detail view
│   └── ui/                 # Reusable UI components
├── state/                  # Redux store configuration
│   ├── actions/            # Action creators and types
│   └── reducers/           # Redux reducers
├── models/                 # TypeScript interfaces and types
├── __test__/               # Test files
└── App.tsx                 # Main app component
```

## Configuration

### Path Aliases

The project uses path aliases configured via CRACO. You can import files using:

```typescript
import Component from '@/components/Component';
```

This maps `@/` to the `src/` directory.

### ESLint & Prettier

The project is configured with ESLint and Prettier for code quality and formatting:
- ESLint configuration: `.eslintrc.js`
- Prettier integration with ESLint

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Redux documentation](https://redux.js.org/)
- [Chart.js documentation](https://www.chartjs.org/docs/latest/)
- [CRACO documentation](https://craco.js.org/)
